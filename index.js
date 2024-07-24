const express = require("express");
const bodyParser = require("body-parser");
const {WebhookClient, Payload} = require("dialogflow-fulfillment");
const port = 4000;

//create server
const app = express();

//middleware
app.use(bodyParser.json());

app.get("/",(req,res) =>{
    res.send("<h1>Hello, this is a webhook for line Chatbot</h1>");
})

app.post("/webhook",(req,res) => {
    //create webhook client
    const agent = new WebhookClient({
        request: req,
        response: res
    })
     console.log(
       "Dialogflow Request headers: " + JSON.stringify(request.headers)
     );
     console.log("Dialogflow Request body: " + JSON.stringify(request.body));

      function welcome(agent) {
        agent.add(`Welcome to my agent!`);
      }

      function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
      }

      function bodyMassIndex(agent) {
        let weight = agent.parameters.weight;
        let height = agent.parameters.height / 100;
        let bmi = (weight / (height * height)).toFixed(2);
        let result = "ขออภัย หนูไม่เข้าใจ";

        if (bmi < 18.5) {
          result = "คุณผอมไป กินข้าวบ้างนะ";
        } else if (bmi >= 18.5 && bmi <= 22.9) {
          result = "คุณหุ่นดีจุงเบย";
        } else if (bmi >= 23 && bmi <= 24.9) {
          result = "คุณเริ่มจะท้วมแล้วนะ";
        } else if ((bmi >= 25.8) & (bmi <= 29.9)) {
          result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
        } else if (bmi > 30) {
          result = "คุณอ้วนเกินไปละ หาหมอเหอะ";
        }
        const flexMessage = {
          type: "flex",
          altText: "Flex Message",
          content: {
            type: "bubble",
            hero: {
              type: "image",
              url: "https://img.kapook.com/u/2024/wanwanat/bmi.jpg",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
              action: {
                type: "uri",
                uri: "https://line.me/",
              },
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "ํYour body mass index",
                  weight: "bold",
                  size: "xl",
                },
                {
                  type: "box",
                  layout: "vertical",
                  margin: "lg",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          wrap: true,
                          color: "#666666",
                          size: "sm",
                          text: "Your height is $height",
                        },
                      ],
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "Your weight is $weight",
                          wrap: true,
                          color: "#666666",
                          size: "sm",                         
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "BMI: ",
                  size: "xl",
                  color: "#008000",
                  margin: "none",
                },
                {
                  type: "text",
                  text: "bodyMassIndex",
                },
                {
                  type: "button",
                  action: {
                    type: "postback",
                    label: "action",
                    data: "hello",
                  },
                },
              ],
            },
          },
        };

        let payload = new Payload("LINE", flexMessage, {sendAsMessage: true});
        agent.add(payload);
        //agent.add(res);
      }
})

app.listen(port, () =>{
    console.log("Server is running at http://localhost:" + port);
})
