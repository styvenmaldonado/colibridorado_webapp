import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Users: a
    .model({
      userId: a.id().required(),
      given_name: a.string(),
      family_name: a.string(),
      address: a.string(),
      email: a.string(),
      birthdate: a.string(),
      phone_number: a.string(),
      numero_documento: a.string(),
      tipo_documento: a.string(),
      city: a.string(),
      country: a.string(),
      userTypeId: a.json(),
      permissions: a.string(),
      rol: a.json(),
      eventsUsers: a.hasMany("EventsUser","userId"),
      interviews: a.hasMany("Interviews","userId"),
      payment: a.hasMany("Payments","userId")
    })
    .authorization((allow) => [allow.guest()]),

    UsersTypes: a
    .model({
      userTypeId: a.id().required(),
      name: a.string(),
      description: a.string(),
      isDefault: a.boolean(),
    })
    .authorization((allow) => [allow.guest()]),

    Interviews: a
    .model({
      interviewsId: a.id().required(),
      isVerified: a.boolean(),
      description: a.string(),
      userId: a.string(),
      users: a.belongsTo("Users","userId")
    })
    .authorization((allow) => [allow.guest()]),

      Events: a
    .model({
      eventId: a.id().required(),
      type: a.string(),
      name: a.string(),
      location: a.string(),
      location_link: a.string(),
      datetime_start: a.datetime(),
      datetime_end: a.datetime(),
      description: a.string(),
      photos: a.string().array(),
      cancelPolicy: a.string(),
      cost: a.json(),
      cost_interview: a.json(),
      percent_advance_payment: a.integer(),
      instruction: a.json(),
      eventsId: a.hasMany("EventsUser","eventId")
    })
    .authorization((allow) => [allow.guest()]),

      EventsUser: a
    .model({
      eventUsersId: a.id().required(),
      medicalPreincription: a.json(),
      suggestions: a.string(),
      aditional_info: a.string(),
      transport_description: a.string(),
      available_seats_number: a.integer(),
      available_seats: a.boolean(),
      needs_transport: a.boolean(),
      userId: a.string(),
      eventId: a.string(),
      rol: a.json(),
      users: a.belongsTo("Users","userId"),
      events: a.belongsTo("Events","eventId"),
      payments: a.hasMany("Payments","eventUsersId")

    })
    .authorization((allow) => [allow.guest()]),

  Payments: a
    .model({
      paymentId: a.id().required(),
      status: a.string(),
      name: a.string(),
      response_id: a.string(),
      method: a.string(),
      datetime:a.datetime(),
      attachment: a.string(),
      info: a.json(),
      value: a.float(),
      userId: a.string(),
      eventUsersId: a.string(),
      users: a.belongsTo("Users","userId"),
      eventUsers: a.belongsTo("EventsUser","eventUsersId")
    })
    .authorization((allow) => [allow.guest()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});



/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>