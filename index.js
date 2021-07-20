Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "pages": [
        {
            "questions": [
                {
                    "type": "matrix",
                    "name": "Quality",
                    "title": "Please indicate if you agree or disagree with the following statements",
                    "columns": [
                        {
                            "value": 1,
                            "text": "Strongly Disagree"
                        }, {
                            "value": 2,
                            "text": "Disagree"
                        }, {
                            "value": 3,
                            "text": "Neutral"
                        }, {
                            "value": 4,
                            "text": "Agree"
                        }, {
                            "value": 5,
                            "text": "Strongly Agree"
                        }
                    ],
                    "rows": [
                        {
                            "value": "affordable",
                            "text": "Product is affordable"
                        }, {
                            "value": "does what it claims",
                            "text": "Product does what it claims"
                        }, {
                            "value": "better then others",
                            "text": "Product is better than other products on the market"
                        }, {
                            "value": "easy to use",
                            "text": "Product is easy to use"
                        }
                    ]
                }, {
                    "type": "rating",
                    "name": "satisfaction",
                    "title": "How satisfied are you with the Product?",
                    "mininumRateDescription": "Not Satisfied",
                    "maximumRateDescription": "Completely satisfied"
                }, {
                    "type": "rating",
                    "name": "recommend friends",
                    "visibleIf": "{satisfaction} > 3",
                    "title": "How likely are you to recommend the Product to a friend or co-worker?",
                    "mininumRateDescription": "Will not recommend",
                    "maximumRateDescription": "I will recommend"
                }, {
                    "type": "comment",
                    "name": "suggestions",
                    "title": "What would make you more satisfied with the Product?"
                }
            ]
        }, {
            "questions": [
                {
                    "type": "radiogroup",
                    "name": "price to competitors",
                    "title": "Compared to our competitors, do you feel the Product is",
                    "choices": ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
                }, {
                    "type": "radiogroup",
                    "name": "price",
                    "title": "Do you feel our current price is merited by our product?",
                    "choices": ["correct|Yes, the price is about right", "low|No, the price is too low for your product", "high|No, the price is too high for your product"]
                }, {
                    "type": "multipletext",
                    "name": "pricelimit",
                    "title": "What is the... ",
                    "items": [
                        {
                            "name": "mostamount",
                            "title": "Most amount you would every pay for a product like ours"
                        }, {
                            "name": "leastamount",
                            "title": "The least amount you would feel comfortable paying"
                        }
                    ]
                }
            ]
        }, {
            "questions": [
                {
                    "type": "text",
                    "name": "email",
                    "title": "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
                }
            ]
        }
    ]
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
        saveSurveyToPdf("surveyResult.pdf", survey, pdfWidth, pdfHeight);
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