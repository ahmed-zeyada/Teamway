I decided to add more requirements to make this assignment more challenging as follow:

1. Admin API with frontend to manage questions/answers and scores.
2. Test session synchronized with backend, so user can close browser and continue the test later.
3. Questions menu in frontend to let the user navigate easily between the questions along with Prev/Next buttons. (Question button turns to green if answer is provided)

### How to run

1. Clone the repo.
2. Open folder [Backend\Teamway.API] and run command [dotnet run --configuration Release], this will start backend server on port 5000.
3. Open folder [Frontend] and run the following commands [npm install] then [npm start], this will start frontend server. 

### Notes

1. I did my best to create good looking project but of course due to time constraints I had to ignore many things for both backend and frontend.
   in backend things like security and logging are ignored, in frontend I did not have time to follow all best practices for React, Also I did not care much about UI and 
   UX although I managed to handle some validations and errors.
2. I covered only one class with unit tests, used few test cases as an example of how I usually do it. no time to cover all code.
3. I'd like to explain more details about the architecture in next call.

