import App from "./app";

const app: App = new App();

async function run() {
  await app.initApplication();
}

run();
