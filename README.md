# cs465-fullstack
cs-465 Full Stack Development with MEAN

Architecture

Q: Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

A: NoSQL is more effective for systems that might store documents with different schemas but still need to be stored together. Each document can contain subdocuments or links to other documents but do not directly rely on each other. This prevents a document from breaking just because a related document was deleted. Finally, NoSQL allows for horizontal scaling so that as the database gets larger it can be spread between different servers.

Functionality

Q: How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?

A: JSON is a document/data format used to transport information in a easy to read way for different Javascript systems with a predefined format. This allows data to be sent between front and back end with a common format that can be translated on either end with no need to directly talk in any other way.

Q: Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

A: This project utilized the Model View Controller (MVC) design pattern. This included in the server where the views the user interacts with were modified through controllers that used the models to interact with the back end and retrieve data.

Testing

Q: Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

A: Methods a functions built to interact with the various objects in a program to include logging in, regestering, adding items, updating items, getting items, and deleting items. To that end endpoints are used to direct CRUD calls coming from those methods. For example when adding an item the method will make an http.put call to the API. An enpoint will process that call and direct it appropriatly to a method on the API side that will then interact with the database directly. The endpoint can also add layers to the process such as adding an authorization layer before it actually processes the function. This leads into the security aspect. This project had one layer of security where first a user had to be logged in to even attempt an add, delete, or update but also when a method made a call to the API endpoint the enpoint would then use and authorization method to check that the call has the proper token to allow the API operation to proceeed.

Reflection

Q: How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

A: This course is probably tied for the most benificial for my future goals as a software engineer. Developing a full stack application and seeing how it works has broadened my understanding of client facing programs as a whole. I feel that learning how to build a front end that has the MVC design pattern, developing a database for it to pull from, an API to controll interactions between the database and other sections, and an administrators SPA to make changes to the front end in a user friendly inerface for the clients not only helps me understand how all of those aspects interact but also gives me something to demonstrate different flaws that come up when they do and how to best utilize each parts strengths. I feel that I can take this project and use what I learned to build similar things while experimenting with added functionality, making it more efficient/secure, or improving the user experience.
