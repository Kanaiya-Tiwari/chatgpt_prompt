
const readlineSync = require("readline-sync");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Create OpenAI API instance
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Sub-task 1: Get User Input - Departure City
function getDepartureCity() {
  const prompt = "Please enter your departure city:";
  return promptUser(prompt);
}

// Sub-task 2: Get User Input -City
function getDestinationCity() {
  const prompt = "Please enter your destination city:";
  return promptUser(prompt);
}

// Sub-task 3: Call ChatGPT API for Flight Options
async function getFlightOptions(departureCity, destinationCity) {
  const prompt = "What are the available flights from " + departureCity + " to " + destinationCity + "?";
  return await callChatGPTAPI(prompt);
}

// Sub-task 4: Display Flight Options to User
function displayFlightOptions(flightOptions) {
  console.log("Flight options:");
  console.log(flightOptions);
}

// Sub-task 5: Get User Input - Selected Flight
function getSelectedFlight() {
  const prompt = "Please enter the flight number to book:";
  return promptUser(prompt);
}

// Sub-task 6: Call ChatGPT API to Confirm Booking
async function confirmBooking(selectedFlight) {
  const prompt = "Are you sure you want to book flight " + selectedFlight + "?";
  return await callChatGPTAPI(prompt);
}

// Sub-task 7: Display Confirmation to User
function displayConfirmation(confirmation) {
  console.log("Confirmation:");
  console.log(confirmation);
}

// Helper function to prompt the user and get input
function promptUser(prompt) {
  return readlineSync.question(prompt);
}

// Helper function to call the ChatGPT API with a given prompt
async function callChatGPTAPI(prompt) {
  const messages = [{ role: "system", content: prompt }];
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      messages: messages,
      max_tokens: 100,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.log("Error calling ChatGPT API:", error.message);
    return "";
  }
}

// Main Task: Book a Flight
async function bookFlight() {
  // Sub-task 1: Get User Input - Departure City
  const departureCity = getDepartureCity();

  // Sub-task 2: Get User Input - Destination City
  const destinationCity = getDestinationCity();

  // Sub-task 3: Call ChatGPT API for Flight Options
  const flightOptions = await getFlightOptions(departureCity, destinationCity);

  // Sub-task 4: Display Flight Options to User
  displayFlightOptions(flightOptions);

  // Sub-task 5: Get User Input - Selected Flight
  const selectedFlight = getSelectedFlight();

  // Sub-task 6: Call ChatGPT API to Confirm Booking
  const confirmation = await confirmBooking(selectedFlight);

  // Sub-task 7: Display Confirmation to User
  displayConfirmation(confirmation);
}

// Execute the main task
bookFlight();



