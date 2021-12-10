# **User Manual**

**Group Members:**

**Parth Shah - 1811047**

**Raj Shah - 1811048**

**Smit Shah - 1811051**

**Project Title - Connect**

**Github Link -** [**https://github.com/Smit1400/MeanProject/tree/master**](https://github.com/Smit1400/MeanProject/tree/master)

**Drive Link - (Video added here)** [**https://drive.google.com/drive/folders/11UtZpSp1BsnmqJvTokhbb5yrJiahCfhB?usp=sharing**](https://drive.google.com/drive/folders/11UtZpSp1BsnmqJvTokhbb5yrJiahCfhB?usp=sharing)

**Execution Steps:**

**Step - 1**

Clone or download the zip from the GitHub repository mentioned above.

Navigate to the &quot;backend&quot; folder and run command &quot;npm install&quot; to install all the backend

packages.

![](RackMultipart20211210-4-jno28i_html_adf197093c8516be.png)

**Step - 2**

Once installed, go to the server folder and run command **&quot;npm start&quot;** to start the backend server

on port 3000.

Note: Replace the mongo db url with your local url or atlas url.

**Step - 3**![](RackMultipart20211210-4-jno28i_html_6f2503c2245ad62d.png)

Then navigate to &quot;client&quot; folder and run command **&quot;npm install&quot;** to install all the frontend

packages.

![](RackMultipart20211210-4-jno28i_html_4cad44eca5d18af0.png)

**Step - 4**

Then navigate to &quot;client&quot; folder and run command **&quot;ng serve&quot;** to start the project on port 4200(default port)

![](RackMultipart20211210-4-jno28i_html_b115aeaafcdba068.png)

**Step - 5**

Create an account on [https://cloudinary.com/](https://cloudinary.com/)

On successful creation go to the settings provided in the top right of the page.

![](RackMultipart20211210-4-jno28i_html_a54d2d2f02026c36.png)

There go to upload:

![](RackMultipart20211210-4-jno28i_html_afda1b5ed25d2fc.png)

And create a upload preset by clicking on the following line:

![](RackMultipart20211210-4-jno28i_html_180997e4a46ebdf2.png)

After creating it go back to the dashboard.

Under the navbar the value for these fields would be given.

Copy the values of cloud name, upload preset (which you used before to create a new preset) and api base url.

And then stored them in app folder which is in the client folder under the folder named config and name the file as key.js.

![](RackMultipart20211210-4-jno28i_html_a50704e6d114df81.png)

**Save it in this format:**

module.exports = {

UPLOAD\_PRESET : &quot;value&quot;

CLOUD\_NAME : &quot;value&quot;

URL : &quot;value&quot;

};

**Login Page (Sign In ) -**

When you start the website if you are not logged in you will be redirected to this page or else you will be redirected to the post (home) page.

![](RackMultipart20211210-4-jno28i_html_590dc46f52ccb072.png)

**Register Page (Sign UP) -**

In the Login Page if you have clicked a button **&quot;sign up&quot;** or **&quot;create an account&quot;** then you will redirect to this page where you have to add following valid details to register yourself to the website.

![](RackMultipart20211210-4-jno28i_html_f992ee744fd66a85.png)

**Forum Page -**

**This page appears if you click on the Forum button on the navbar.**

**In this page you can start a conversation, delete your forum(posts), see user details on left hand side.**

![](RackMultipart20211210-4-jno28i_html_9945acecd6026400.png)

**Answer Page -**

**If you click the answer button on the forum page you will be directed to this page where you can share your thoughts i.e. answer.**

![](RackMultipart20211210-4-jno28i_html_f73254e71d9bdb73.png)

**Post Page:**

After logging the user will be redirected to this page.

![](RackMultipart20211210-4-jno28i_html_d616e87f0c14077b.png)

Here on the left side user details will be displayed.

You can post using the post form given at the top center of the page ie this:

![](RackMultipart20211210-4-jno28i_html_1e51e78ea1dde7f4.png)

**Here on &quot;Connect&quot; there are two posts a user can do.**

**1)Only text post:**

For this only enter the text in the textarea field and press on &quot;Share&quot;

![](RackMultipart20211210-4-jno28i_html_a3ef7e288088787d.png)

**On pressing the Share button:**

![](RackMultipart20211210-4-jno28i_html_5edc58a89d148aa0.png)

**2) Text + image post:**

For this enter the text in the textarea and select a particular file for the post using the the choose file button provided in the form:

![](RackMultipart20211210-4-jno28i_html_8ee62d1a0d34fe0f.png)

On selecting the file from the local computer. ![](RackMultipart20211210-4-jno28i_html_2e1a5cd683a64cfd.png)

**On pressing the Share button:**

![](RackMultipart20211210-4-jno28i_html_91aa6a3513c289d.png)

One can also like,unlike and delete posts.

Here one will be able to delete only those posts which they have created.
