Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "pages": [
        {
            "name": "page1",
            "elements": {
                "type": "panel",
                "innerIndent": 1,
                "name": "panel1",
                "title": "Please, help us improve our product",
                "visibleIf": "{satisfaction} < 3",
                "elements": [
                    {
                        "type": "checkbox",
                        "choices": [
                            {
                                "value": "1",
                                "text": "Customer relationship"
                            }, {
                                "value": "2",
                                "text": "Service quality"
                            }, {
                                "value": "3",
                                "text": "Support response time"
                            }
                        ],
                        "name": "What should be improved?"
                    }, {
                        "type": "comment",
                        "name": "suggestions",
                        "title": "What would make you more satisfied with the Product?"
                    }, {
                        "type": "panel",
                        "innerIndent": 1,
                        "name": "panel2",
                        "title": "Send us your contact information (optionally)",
                        "state": "collapsed",
                        "elements": [
                            {
                                "type": "text",
                                "name": "name",
                                "title": "Name:"
                            }, {
                                "type": "text",
                                "inputType": "email",
                                "name": "email",
                                "title": "E-mail"
                            }
                        ]
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