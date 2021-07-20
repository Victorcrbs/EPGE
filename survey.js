Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "pages": [
        {
            "name": "page1",
            "elements": [ 
                {
                    "type": "text",
                    "name": "nome",
                    "title": "Nome",
                    "placeholder": "Digite seu nome",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "email",
                    "title": "E-mail",
                    "placeholder": "Digite seu e-mail",
                    "isRequired": true
                },
                {
                    "type": "rating",
                    "name": "eficiencia",
                    "title": "Avalie a eficiência deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "eficienciacomment",
                    "title": "Algum comentário adicional?",
                    "placeholder":"está relacionado a eficiência do liderado em realizar entregas no prazo e dentro do orçamento estabelecido para a atividade."
                },
                {
                    "type": "rating",
                    "name": "eficacia",
                    "title": "Avalie a eficácia deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "eficaciacomment",
                    "title": "Algum comentário adicional?"
                },
                {
                    "type": "rating",
                    "name": "postura",
                    "title": "Avalie a postura deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "posturacomment",
                    "title": "Algum comentário adicional?"
                },
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "rating",
                    "name": "eficiencia",
                    "title": "Avalie a eficiência deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "eficienciacomment",
                    "title": "Algum comentário adicional?",
                    "placeholder":"está relacionado a eficiência do liderado em realizar entregas no prazo e dentro do orçamento estabelecido para a atividade."
                },
                {
                    "type": "rating",
                    "name": "eficacia",
                    "title": "Avalie a eficácia deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "eficaciacomment",
                    "title": "Algum comentário adicional?"
                },
                {
                    "type": "rating",
                    "name": "postura",
                    "title": "Avalie a postura deste colaborador:",
                    "isRequired": true,
                    "rateMin": 0,
                    "rateMax": 10,
                },
                {
                    "type": "comment",
                    "name": "posturacomment",
                    "title": "Algum comentário adicional?"
                },
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
