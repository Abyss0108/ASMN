/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome, you can say Hello or Help. Which would you like to try?',
            HELLO_MESSAGE: 'Hello World!',
            HELP_MESSAGE: 'You can say hello to me! How can I help?',
            GOODBYE_MESSAGE: 'Goodbye!',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
            GET_FACT_MESSAGE: 'A fun fact is: ',
            FACTS: [
                'It is known for having elegant and sophisticated designs.',
                'It was founded in 1913 by Lionel Martin and Robert Bamford in London.',
                'Their team won Le Mans in 1959 with the DBR1.',
                'Their cars are exclusive, so production is limited.',
                'Many of the components of their cars are handmade.',
                'They use carbon fiber and infotainment systems in the construction of their cars.',
                'They have iconic models such as the DB5, V8 Vantage, and Valkyrie.',
                'Aston Martin invests in sustainable technology, so they are developing electric cars, like the Lagonda.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Hola!, puedes decir Hola o Ayuda. ¿Cuál te gustaría probar?',
            HELLO_MESSAGE: '¡Hola Mundo!',
            HELP_MESSAGE: '¡Puedes saludarme! ¿Cómo puedo ayudar?',
            GOODBYE_MESSAGE: '¡Adiós!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor intenta de nuevo.',
            ERROR_MESSAGE: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
            GET_FACT_MESSAGE: 'Un dato curioso es: ',
            FACTS: [
                'Fue fundada en 1913 por Lionel Martin y Robert Bamford en Londres.',
                'Es conocida por tener diseños elegantes y sofisticados.',
                'En su escudería ganaron Le Mans en 1959 con el DBR1.',
                'Sus coches son exclusivos, por lo que la producción es limitada.',
                'Muchos de los componentes de sus coches son hechos a mano.',
                'Utilizan fibra de carbono y sistemas de infoentretenimiento en la construcción de sus coches.',
                'Tiene modelos icónicos como el DB5, V8 Vantage y Valkyrie.',
                'Aston Martin invierte en tecnología sostenible, por lo que está desarrollando coches eléctricos, como el Lagonda.'
            ]
        }
    },
    fr: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenue, vous pouvez dire Bonjour ou Aide. Que souhaitez-vous essayer?',
            HELLO_MESSAGE: 'Bonjour le Monde!',
            HELP_MESSAGE: 'Vous pouvez me dire bonjour! Comment puis-je aider?',
            GOODBYE_MESSAGE: 'Au revoir!',
            REFLECTOR_MESSAGE: 'Vous venez de déclencher %s',
            FALLBACK_MESSAGE: 'Désolé, je ne sais pas cela. Veuillez réessayer.',
            ERROR_MESSAGE: 'Désolé, il y a eu une erreur. Veuillez réessayer.',
            GET_FACT_MESSAGE: 'Un fait amusant est: ',
            FACTS: [
                'Elle a été fondée en 1913 par Lionel Martin et Robert Bamford à Londres.',
                'Elle est connue pour ses designs élégants et sophistiqués.',
                'Son équipe a remporté Le Mans en 1959 avec la DBR1.',
                'Leurs voitures sont exclusives, donc la production est limitée.',
                'Ils ont des modèles emblématiques comme la DB5, la V8 Vantage et la Valkyrie.'
            ]
        }
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    }
};

const GetFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const factArr = requestAttributes.t('FACTS');
        const randomFact = factArr[Math.floor(Math.random() * factArr.length)];
        const speakOutput = requestAttributes.t('GET_FACT_MESSAGE') + randomFact;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetFactIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor
    )
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();