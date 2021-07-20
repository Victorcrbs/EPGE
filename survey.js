Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "rating",
                    "name": "nps_score",
                    "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                    "minRateDescription": "(Most unlikely)",
                    "maxRateDescription": "(Most likely)"
                }, {
                    "type": "checkbox",
                    "name": "promoter_features",
                    "visibleIf": "{nps_score} >= 9",
                    "title": "What features do you value the most?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "Please select two features maximum.",
                            "maxCount": 2
                        }
                    ],
                    "hasOther": true,
                    "choices": [
                        "Performance", "Stability", "User Interface", "Complete Functionality"
                    ],
                    "otherText": "Other feature:",
                    "colCount": 2
                }, {
                    "type": "comment",
                    "name": "passive_experience",
                    "visibleIf": "{nps_score} > 6  and {nps_score} < 9",
                    "title": "What is the primary reason for your score?"
                }, {
                    "type": "comment",
                    "name": "disappointed_experience",
                    "visibleIf": "{nps_score} notempty",
                    "title": "What do you miss and what was disappointing in your experience with us?"
                }
            ]
        }
    ],
    "showQuestionNumbers": "off"
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

survey.render("surveyElement");

function saveSurveyToPdf(filename, surveyModel, pdfWidth, pdfHeight) {
    var options = {
        fontSize: 14,
        margins: {
            left: 10,
            right: 10,
            top: 10,
            bot: 10
        },
        format: [pdfWidth, pdfHeight]
    };
    var surveyPDF = new SurveyPDF.SurveyPDF(json, options);
    surveyPDF.data = surveyModel.data;
    surveyPDF.save(filename);
}

document
    .getElementById("saveToPDFbtn")
    .onclick = function () {
        var pdfWidth = survey.pdfWidth || 210;
        var pdfHeight = survey.pdfHeight || 297;
        saveSurveyToPdf("RelatorioAVDITech.pdf", survey, pdfWidth, pdfHeight);
    };

survey.data = {
    'Quality': {
        'affordable': '3',
        'does what it claims': '4',
        'better then others': '3',
        'easy to use': '5'
    },
    'satisfaction': '4',
    'recommend friends': '4',
    'suggestions': '24/7 support would help a lot.',
    'price to competitors': 'Not sure',
    'price': 'correct',
    'pricelimit': {
        'mostamount': 450,
        'leastamount': 200
    },
    'email': 'jon.snow@nightwatch.org'
};