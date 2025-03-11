const textInput = document.querySelector("#textInput");
const voiceSelect = document.querySelector("#voiceSelect");
const playBtn = document.querySelector("#playBtn");

const synth = window.speechSynthesis;

let voices = [];

// Function to load voices
function loadVoices() {
    voices = synth.getVoices();
    
    // Filter out the "Rishi" voice
    const filteredVoices = voices.filter(voice => voice.name !== "Rishi");

    // Update the select dropdown with the remaining voices
    voiceSelect.innerHTML = filteredVoices.map((voice, index) => 
        `<option value="${index}">${voice.name}</option>`
    ).join('');
}

// Call the loadVoices function when voices are loaded
synth.onvoiceschanged = loadVoices;

// Function to convert text to speech
function convert() {
    const text = textInput.value;
    const speech = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];
    
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    return speech;
}

playBtn.addEventListener("click", () => {
    if (!textInput.value) {
        alert("Enter text first!");
        return;
    } else {
        synth.speak(convert());
    }
});
