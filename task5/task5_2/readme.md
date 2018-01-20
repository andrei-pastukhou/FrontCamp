# MongoDB. Home Task 2 #
## Import Airline Collection ##
Follow these steps to import airlines collection to your local data base:
1. Save airlines.csv on your PC
2. Run local instance of MongoDB
3. Use mongoimport to import the collection to the database
    
    Query:
    ```
    mongoimport.exe -d frontcamp -c airlines --type csv --headerline --file d:/airlines.csv
    ```

    Result:
    ```
    2018-01-18T10:13:24.971+0300    connected to: localhost
    2018-01-18T10:13:27.965+0300    [##################......] frontcamp.airlines   14.9MB/19.1MB (78.2%)
    2018-01-18T10:13:28.966+0300    [########################] frontcamp.airlines   19.1MB/19.1MB (100.0%)
    2018-01-18T10:13:28.967+0300    imported 186648 documents
    ```
4. Verify that the number of the documents in the airlines collection is 186648

    Query:
    ```
    db.airlines.find().count()
    
    ```
    
    Result:
    ```
    186648
    ```
## Aggregating Airlines Collection ##
Look at a document from the collection to get familiar with the schema. Answer the following questions and include both query and the result into your report:
1. How many records does each airline class have? Use $project to show result as { class: "Z", total: 999 }
    Query:
    ```
    db.airlines.aggregate([{$group: {class :{$first: "$class"}, _id: "$class", total: { $sum: 1 }}},{$project: {class : 1, _id : 0, total : 1}}])
    ```
    
    Result:
    
    ```
    { "class" : "F", "total" : 140343 }
    { "class" : "L", "total" : 23123 }
    { "class" : "P", "total" : 5683 }
    { "class" : "G", "total" : 17499 }
    ```
2. What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as { "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" }
    Query:
    ```
    db.airlines.aggregate([{$match: { "originCountry" : "United States", "destCountry" : {$ne :"United States"} }},{$group: {_id : "$destCity", avgPassengers: { $avg: "$passengers" }, city: {$first : "$destCity"}}},{ $sort : { avgPassengers : -1}},{$limit : 3},{$project: {_id : 0}}])
    ```
    
    Result:
    ```
    { "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
    { "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
    { "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }
    ```
    
3. Which carriers provide flights to Latvia (destCountry)? Show result as one document { "_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }
    Query
    ```
    db.airlines.aggregate([{$match: { "destCountry" : "Latvia"}},{$group: {_id : "$destCountry", carriers: {$addToSet : "$carrier"}}}])
    ```
    
    Result:
    ```
    { "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }
    ```
4. What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the first 3). Show result as { "_id" : "<carrier>", "total" : 999}
    Query:
    ```
     db.airlines.aggregate( [ {$match: { $and: [ {originCountry : "United States"}, {$or: [ {destCountry: "Greece"}, {destCountry:"Italy"}, {destCountry:"Spain"}]}]}}, {$group: {_id : "$carrier", total: { $sum: "$passengers" }}},{ $sort : { total : -1}},{$limit : 10},{$skip : 3}] )
    ```
    
    Result:
    ```
     { "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
        { "_id" : "United Air Lines Inc.", "total" : 229936 }
        { "_id" : "Emirates", "total" : 100903 }
        { "_id" : "Air Europa", "total" : 94968 }
        { "_id" : "Meridiana S.p.A", "total" : 20308 }
        { "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
        { "_id" : "VistaJet Limited", "total" : 183 }
    ```
5. Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as { "totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz" } }
    Query:
    ```
    db.airlines.aggregate( [ {$match: { originCountry : "United States"}}, {$group: {_id : "$originCity", total: { $sum: "$passengers" }, state: {$first:"$originState"}}}, {$sort : { total : -1}},{$sort:{state:1}},{$group :{_id : "$state", c2:{$first : "$_id"}, totalPassangers:{$first: "$total"}}},{$sort: {_id:1}},{ $addFields: { location : {"state" : "$_id", "city" : "$c2"}} },{$limit : 5},{$project :{_id:0,c2:0}}])
    ```
    
    Result:
    ```
    { "totalPassangers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
    { "totalPassangers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
    { "totalPassangers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
    { "totalPassangers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
    { "totalPassangers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }
    ```

## Restore Enron Collection ##
Follow these steps to restore enron collection:
1. Save enron.zip to your PC
2. Unzip the contents to a folder
3. Run local instance of MongoDB
4. Use mongorestore to import the collection:
mongorestore -d frontcamp -c enron <path to messages.bson>
    
    Query:
    ```
    D:\server\MongoDb\bin>mongorestore
   
    ```
    
    Result:
    ```
    2018-01-20T16:39:05.544+0300    using default 'dump' directory
    2018-01-20T16:39:05.545+0300    preparing collections to restore from
    2018-01-20T16:39:05.560+0300    reading metadata for enron.messages from dump\enron\messages.metadata.json
    2018-01-20T16:39:05.678+0300    restoring enron.messages from dump\enron\messages.bson
    2018-01-20T16:39:08.539+0300    [#######.................]  enron.messages  111MB/378MB  (29.3%)
    2018-01-20T16:39:11.539+0300    [#############...........]  enron.messages  214MB/378MB  (56.6%)
    2018-01-20T16:39:14.539+0300    [###################.....]  enron.messages  311MB/378MB  (82.3%)
    2018-01-20T16:39:16.666+0300    [########################]  enron.messages  378MB/378MB  (100.0%)
    2018-01-20T16:39:16.666+0300    no indexes to restore
    2018-01-20T16:39:16.666+0300    finished restoring enron.messages (120477 documents)
    2018-01-20T16:39:16.666+0300    done
    ```
## Aggregate Enron Collection ##
Inspect a few of the documents to get a basic understanding of the structure. Enron was an American corporation that engaged in a widespread accounting fraud and subsequently failed.
In this dataset, each document is an email message. Like all Email messages, there is one sender but there can be multiple recipients.
For this task you will use the aggregation framework to figure out pairs of people that tend to communicate a lot. To do this, you will need to unwind the To list for each message.
This problem is a little tricky because a recipient may appear more than once in the To list for a message. You will need to fix that in a stage of the aggregation before doing your grouping and counting of (sender, recipient) pairs.
Which pair of people have the greatest number of messages in the dataset?
For you reference the number of messages from phillip.love@enron.co to sladana-anna.kulic@enron.com is 144.

Query:
```
db.messages.aggregate( [{$group : {_id:"$_id", from:{$last : "$headers.From"}, to: {$first : "$headers.To"}}}, {$unwind: { path: "$to"}},    { "$group": { _id: {"from": "$from", "to": "$to"}, "count": { "$sum": 1 }}}, {$sort :{count :-1}}    ])
```

Result:
```
    { "_id" : { "from" : "veronica.espinoza@enron.com", "to" : "recipients@enron.com" }, "count" : 2181 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "richard.shapiro@enron.com" }, "count" : 974 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com" }, "count" : 750 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "james.wright@enron.com" }, "count" : 708 }
    { "_id" : { "from" : "soblander@carrfut.com", "to" : "soblander@carrfut.com" }, "count" : 679 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "james.steffes@enron.com" }, "count" : 648 }
    { "_id" : { "from" : "evelyn.metoyer@enron.com", "to" : "kate.symes@enron.com" }, "count" : 567 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "karen.denne@enron.com" }, "count" : 552 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "alan.comnes@enron.com" }, "count" : 550 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "paul.kaufman@enron.com" }, "count" : 509 }
    { "_id" : { "from" : "rhonda.denton@enron.com", "to" : "mark.guzman@enron.com" }, "count" : 493 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "harry.kingerski@enron.com" }, "count" : 489 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "paul.kaufman@enron.com" }, "count" : 488 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "jdasovic@enron.com" }, "count" : 485 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "harry.kingerski@enron.com" }, "count" : 481 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "smara@enron.com" }, "count" : 467 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "mday@gmssr.com" }, "count" : 464 }
    { "_id" : { "from" : "susan.mara@enron.com", "to" : "sandra.mccubbin@enron.com" }, "count" : 464 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "steven.j.kean@enron.com" }, "count" : 460 }
    { "_id" : { "from" : "sgovenar@govadv.com", "to" : "rshapiro@enron.com" }, "count" : 457 }
    Type "it" for more
    
```

Answer:
```
    { "_id" : { "from" : "veronica.espinoza@enron.com", "to" : "recipients@enron.com" }, "count" : 2181 }
```