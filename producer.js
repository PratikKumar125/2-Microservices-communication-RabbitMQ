const amqp = require("amqplib")
connect()
const msg = [{"name" : "prateek"}]
async function connect(){
    try{
        const conn = await amqp.connect("amqp://localhost:5672")
        const channel = await conn.createChannel()
        await channel.assertExchange("Luckyexchange", "direct", {durable:false})
        const express = require("express")
        const app = express();
        app.get("/fetchme", async (req, res) => {
            await channel.publish("Luckyexchange", "oranges", Buffer.from(JSON.stringify(msg)))
            console.log("msg sent from here to lucky exchange with routing key oranges....");
        })
        app.listen(5000, () => {
            console.log("express lisiting at http://0.0.0.0:5000");
        });
    }
    catch(ex){
        console.log(ex);
    }
}
