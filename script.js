async function translateText() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;
    const target = document.getElementById("targetLang").value;

    if (!text || !key || !region) {
        alert("Fill all fields");
        return;
    }

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${target}`;

    document.getElementById("outputText").value = "Translating...";

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        const data = await res.json();

        const translated = data[0].translations[0].text;
        const detected = data[0].detectedLanguage.language;

        document.getElementById("outputText").value = translated;
        document.getElementById("detectedLang").innerText =
            "From: " + detected.toUpperCase();

    } catch (e) {
        document.getElementById("outputText").value = "Error";
    }
}

/* copy */
function copyText(id) {
    const text = document.getElementById(id);
    text.select();
    document.execCommand("copy");
}

/* clear */
function clearText(id) {
    document.getElementById(id).value = "";
}

/* speech */
function speak(id) {
    const text = document.getElementById(id).value;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}

/* swap */
function swapLanguages() {
    let input = document.getElementById("inputText");
    let output = document.getElementById("outputText");

    let temp = input.value;
    input.value = output.value;
    output.value = temp;
}