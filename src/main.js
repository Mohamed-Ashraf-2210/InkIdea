import bootstrap from "./app.bootstrap.js";
try{
    await bootstrap()
} catch(error){
    throw new Error("Starting program failure", { cause: error })
    process.exit = 1
}
