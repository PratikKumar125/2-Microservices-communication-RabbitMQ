const amqp = require("amqplib")
connect()
async function connect(){
    try{
        const conn = await amqp.connect("amqp://localhost:5672")
        const channel = await conn.createChannel()
        channel.assertExchange("Luckyexchange", "direct", {durable:false})
        const q = await channel.assertQueue('', {exclusive:true})
        channel.bindQueue(q.queue, "Luckyexchange", "oranges")
        const express = require("express")
        const app = express();
        app.get("/fetchme", async (req, res) => {
            try {
                channel.consume(q.queue, (msg) => {
                    console.log("received a msg....");
                    console.log(msg.fields.routingKey);
                }, {noAck : true})
                console.log("msg recieved from lucky exchange with routing key oranges....");
            } catch (error) {
                console.log("some error occured at receiver side......");
            }
            
        })
        app.listen(5001, () => {
            console.log("express lisiting at http://0.0.0.0:5001");
        });
    }
    catch(ex){
        console.log(ex);
    }
}