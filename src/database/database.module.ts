import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// Change this to your own uri
const MONGO_URI = "mongodb://mongodb:27017";
// const MONGO_URI = "mongodb://127.0.0.1:27017";

// Connect to the database
const db = MongooseModule.forRoot(MONGO_URI, {
  dbName: "InAppCurrency",
});

@Module({
  imports: [db],
  exports: [db],
})
export class DatabaseModule {}
