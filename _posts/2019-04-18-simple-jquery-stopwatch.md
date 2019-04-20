---
title: "Simple jQuery stopwatch"
date: 2019-04-18
tags: [JavaScript, jQuery, Date(), google fonts]
excerpt: "Introduction text"
---

I would call this stopwatch example as oldies but goldies. I am seeing a similar demonstration on many portfolio pages and I also wanted make one. The coding was fun and a bit tricky. As I do in most of my projects, I began searching the net and analyzed different codes / web technologies to make it happen. Although there are modern ways of doing such stopwatch, I sticked with jQuery since I wanted to include jQuery in my portfolio.

It is important to note that, I haven't used any plug and play libraries to make it. However, if this was a tiny part of a larger project, I would have seen no harm using so. (for time and resouce optimization)

As always, let's breakdown the code and dive into details:

'''javascript
startTime = new Date();
'''

I decided to use date function at the core of this project. The way it works is that..
