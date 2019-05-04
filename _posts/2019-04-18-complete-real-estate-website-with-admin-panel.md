---
title: "Complete real estate website with admin panel (Custom build CMS, MySQL and PHP)"
date: 2019-04-18
tags:
  [
    CMS,
    admin panel,
    Bootstrap,
    HTML5,
    PHP,
    MySQL,
    corporate website,
    contact form,
    user accounts,
    responsive,
    dynamic content,
    google reCAPTCHA,
    mobile detection,
    photo upload,
    google analytics,
    user statistics,
  ]
excerpt: "This post is about a complete real estate website with admin panel (Custom build CMS, MySQL and PHP). Unlike most of my other blog posts, this content does not has a GitHub repository."
---

This post is about a complete real estate website with admin panel (Custom build CMS, MySQL and PHP). Unlike most of my other blog posts, this content does not has a GitHub repository. It is because it was a private work to a customer. Nevertheless, I will be discussing the work I did in the following sections. (If you are willing to view the site immediately, please see the [link](https://www.platinatasehir.com)).

**- Once you open the page, please go through developer tools of your browser and see my mark at the beginning of the HTML. -**

To begin with, this was one of my most comprehensive work. The website is for a real estate firm and they wanted me to make an admin panel where, all of their employees (agents) have their own accounts. The beautiy relies on the back-end. Apart from its front end, I used PHP and MySQL to power up tons of features.

This customer wanted me to do the entire project. They came up with a real estate template from _Themeforest_ and told me their needs. After several discussions, meetings and planning, I started building the admin panel and configuring their front end template. It is important to note that, I _did not_ use any `library` or `CMS` systems such as WordPress, Drupal or Joomla etc., instead I built my own. Although, it is not directly suitable for other business types, it became a `framework` on its own. I am listing main features with their explanations below:

- **Add / remove / suspend account, change / reset passwords:**
  ⋅⋅⋅ There are two types of accounts. One is a super user, the other one is a regular user account. Only the super user can create both (which is the company owner). Super user has the full control over every account and the website content; except terminating itself. (No need to mention, passwords are `bcrypted` using hashing API and then stored)

- **Every account holder can set / change their own passwords, add / remove their social media and other real estate website profiles:**
  ⋅⋅⋅ This feature is important because each real estate agent is responsible for specific regions and markets themselves under this company. It is important to note that, if one of the agents leaves the job, the portfolios that he/she deals with are transferred to another agent chosen by the super user. Thus, the company avoids loss of business and protects its assets.

- **Every account holder can add / remove their real estate portfolios:**
  ⋅⋅⋅ Every real estate portfolio has image upload option and tens of details to be selected about the property. (I didn't like ready to use image upload JavaScript libraries at that time, so I wrote my own)

- **Portfolio approval:**
  ⋅⋅⋅ Every uploaded real estate portfolio is reviewed by the owner before it is published to the web. If the owner does not approve, he/she sends it back to the agent to re-check and send for approval again. (owner can pin notes to portfolios, so agent knows what is wrong and why it is rejected) To add that, once the portfolio goes live, it can be edited or removed by its agent. However, owner must approve this action again.

- **Tag structure:**
  ⋅⋅⋅ I have also implemented a tag structure. By doing so, portfolios positions can be changed on the client side. Slider / featured / new arrivals etc.) So the owner gets to control the visibility of each portfolio.

- **Statistics:**
  ⋅⋅⋅ Since all agents are in the system, I was able to create statistics. Each user ends up in the landing page after logging in. This page displays relevant information about their performance. Therefore, everyone knows about each other and that creates a competition.

All those actions above are attached to a _notification system_ similar to social media sites. So no one misses a task. They are also informed by _automatic emails_. Lastly and obviously, this whole structure requires a database and its management. I used `MySQL` for that. (Established PDO connections to connect PHP to MySQL)

In addition to everything, the site is equipped with meta tags and google analytics. I did all their webmasters work, submitted their sitemaps and ran inspections over the code. Moreover, each link is suitable for social media sharing. If you copy the link and paste it on Facebook or LinkedIn, meta tags do their job, read related information and image regarding to that page.

Here is the [link](https://www.platinatasehir.com) to the site. Unfortunately you will not be able view above features, since they are on the server side.

**- Once you open the page, please go through developer tools of your browser and see my mark at the beginning of the HTML. -**

This post has been very long, thanks for reading! You are very welcome if you could give me your positive or negative opinion.
