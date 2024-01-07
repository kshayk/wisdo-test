## Wisdo Test - How To Run
1. Make sure you have docker installed
2. Create the network `docker network create wisdo-network`
3. Before running the containers, add the following to your .env file:
```MONGO_HOST=mongodb
NODE_ENV=local
MONGO_USER=wisdo
MONGO_PASSWORD=wisdo12345
```
These credentials are only for the local env to test the functionality.
4. Run `docker-compose up --build -d` to build the containers and run them
5. By starting the containers, a user with the same credentials as above will be created in the DB.
6. You can use the following Postman collection to test the API:
   https://api.postman.com/collections/5812203-4e20f75f-b3c3-440e-b32c-6c7b4dfe1c70?access_key=PMAT-01HKHYGTEW2DFPB6KBBC7H4MQR.
   For you convenience, in this collection you will also find some helpful requests that will save a user and a community and will add a user to the community (`/add-test-data`), and other useful requests for data seeding and tests.
7. You can run `npm run test` locally to run the tests. You will need to first run `npm run build` locally to build the project.
8. In the `job` folder, you can find the job that should run periodically.