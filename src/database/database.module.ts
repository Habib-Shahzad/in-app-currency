import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const db = MongooseModule.forRoot("mongodb://mongodb:27017", {
  dbName: "InAppCurrency",
});

@Module({
  imports: [db],
  exports: [db],
})
export class DatabaseModule {}
