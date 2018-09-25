let madlibText = `Hi [Your&#032Name], it was great meeting you at the [Adjective] __Event Name__!  I'm really [Emotion&#032Adjective] that I made it to the event, because I tripped over a [Noun] when I was [Verbing] my way to the event and almost had to go to the [Place].%0D%0A%0D%0AIf [Your&#032Company] has any openings you think I would be a good fit for, maybe we can discuss it over some [Beverage]!  (As long as it's not at [Time], because I am usually [Verbing] my code around that time.)%0D%0A%0D%0AThanks for taking the time to [Verb] this Mad Libs game!  Looking forward to speaking with you again soon.`;

let arrayOfDOMids = [];

let hasValidatedOnce = false;

let wordDictionary = {
    adjective: ["awesome", "hypnotic", "fresh", "deafening", "stupendous", "lavish", "contemporary"],
    verb: ["stab", "withdraw", "enlighten", "occupy", "punish", "cheer", "conquer", "betray"],
    verbing: ["educating", "stating", "searching", "ferrying", "stabbing", "donating", "crushing", "kicking", "donating"],
    adjectiveEmotion: ["overjoyed", "optimistic", "skeptical", "courageous", "amazed", "perplexed", "proud"],
    beverage: ["coffee", "water", "gatorade", "tomato juice"],
    time: ["noon", "3PM", "4:45PM", "11AM"],
    noun: ["cushion", "laborer", "toothbrush", "crook", "loaf", "potato", "lawyer"],
    place: ["library", "airport", "hospital", "99 cent store"],
    name: ["Dark Lord", "Curious George", "Harry Potter", "Ash Ketchum"],
    company: ["Rebel Alliance", "Umbrella Corp.", "Massive Dynamic"],
}

$("#submit").click(function (e) {
    onSubmit();
})

function parseMadLib(madLibString) {
    let regexp = /[^\[]+(?=\])/g;
    let stringToMatch = madLibString;
    let match;
    let matches = [];
    while (match = regexp.exec(stringToMatch)) {
        matches.push(match[0]);
    }
    return matches;
}

function populateDOM() {
    let arrayOfResults = parseMadLib(madlibText);
    console.log(arrayOfResults);
    for (let i = 0; i < arrayOfResults.length; i++) {
        let identifier = arrayOfResults[i].replace(/&#032+/g, '') + "_" + i;
        $("#table").append(`
            <tr class="row">
                <td class="labels">
                    ${arrayOfResults[i]}
                </td>
                <td>
                    <input type="text" name=${identifier} id=${identifier} placeholder=${arrayOfResults[i]} required>
                </td>
                <td class="randomRow"><button type="button" class="random"  onclick="randomizer(${identifier})">Random word!</button></td>
            </tr>
        `)
        $("#" + identifier).on("change", function() {$("#" + identifier).removeClass("missing")});
        arrayOfDOMids.push(identifier);
    }
    $("#table").append(`
            <tr class="row">
                <td class="labels">
                    Your email
                </td>
                <td>
                    <input type="text" name="email" id="email" placeholder="email@company.com" required>
                </td>
            </tr>
        `)
    arrayOfDOMids.push("email");
}

function validateForm() {
    let blankFound = false;
    let emailFormatIncorrect = false;
    for (let domNode of arrayOfDOMids) {
        if (!$("#" + domNode).val()) {
            $("#" + domNode).addClass("missing");
            blankFound = true;
        } else {
            $("#" + domNode).removeClass("missing");
        }
    }

    let re = /.{2,}@.{3,}\..{2,}$/;
    let match = $("#email").val().match(re);
    if (!match) {
        emailFormatIncorrect = true;
        $("#email").addClass("missing");
    }

    if (blankFound && emailFormatIncorrect) {
        alert("Please fill out all fields, and make sure your email follows the correct format: name@domain.tld")
        return blankFound;
    }
    if (blankFound) {
        alert("Please fill out all fields!");
        return blankFound;
    }
    if (emailFormatIncorrect) {
        alert("Please make sure your email follows the correct format: name@domain.tld");
        return emailFormatIncorrect;
    }

    return false;
}

function onSubmit() {
    event.preventDefault();
    let errorsFound = validateForm();

    if (!errorsFound) {
        let emailText = buildFinalEmail();
        sendEmail(emailText);
    }
}

function randomizer(idToChange) {
    let wordArray = [];

    if (idToChange.placeholder === "Adjective") {
        wordArray = wordDictionary.adjective;
    }
    if (idToChange.placeholder === "Verb") {
        wordArray = wordDictionary.verb;
    }
    if (idToChange.placeholder === "Verbing") {
        wordArray = wordDictionary.verbing;
    }
    if (idToChange.placeholder === "Emotion Adjective") {
        wordArray = wordDictionary.adjectiveEmotion;
    }
    if (idToChange.placeholder === "Beverage") {
        wordArray = wordDictionary.beverage;
    }
    if (idToChange.placeholder === "Time") {
        wordArray = wordDictionary.time;
    }
    if (idToChange.placeholder === "Noun") {
        wordArray = wordDictionary.noun;
    }
    if (idToChange.placeholder === "Place") {
        wordArray = wordDictionary.place;
    }
    if (idToChange.placeholder === "Your Name") {
        wordArray = wordDictionary.name;
    }
    if (idToChange.placeholder === "Your Company") {
        wordArray = wordDictionary.company;
    }
    if (idToChange.placeholder === "email@company.com") {
        return;
    }
    
    $("#"+idToChange.id).removeClass("missing");

    let randomIndex = Math.floor(Math.random() * wordArray.length);
    idToChange.value = wordArray[randomIndex];
}

function randomizeAll() {
    for (let domNode of arrayOfDOMids) {
        randomizer($("#" + domNode)[0]);
    }
}

function buildFinalEmail() {
    let regexp = /\[(.*?)\]/g;
    let stringToMatch = madlibText;
    let match;
    let i = 0;
    let finalText = "";
    let arrayOfValues = [];
    while (match = regexp.exec(stringToMatch)) {
        let replacee = "\\" + match[0];
        let replacer = `#${match[1].replace(/&#032+/g, '')}_${i}`;
        replacer = $(replacer).val();
        let re = new RegExp(replacee);
        i++;
        stringToMatch = stringToMatch.replace(re, replacer);
    }

    let emailBody = `${stringToMatch} %0D%0A%0D%0AViviana Ogawa%0D%0A%0D%0AResume:%0D%0Ahttps://docs.google.com/document/d/1hYl2418jEDph8F9i5BWuySUkWj1UI34SaPDL21Zyaps/edit?usp=sharing

    `
    return emailBody;
}

function sendEmail(emailBody) {
    let recipient = $("#email").val();
    let subject = "hello this is a test";
    let body = emailBody;


    location.href = `mailto:${recipient}?Subject=Your%20Mad%20Libs%20Result!%20&body=${body}`;
}





populateDOM();
