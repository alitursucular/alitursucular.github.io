---
title: "Color codes conversion website (HEX, RGB(A), CMYK, HSL, HSB/HSV)"
date: 2019-04-18
tags: [HTML5, CSS3, JavaScript, color codes, conversion, HEX, RGB, CMYK]
excerpt: "I love math and I enjoy diving into the logic of things that I use. Color codes are one of them. Every color can be represented by different types and each type has different properties/areas of usage."
---

Here is the [demo](https://alitursucular.github.io/color-codes-conversion-website-demo/) and [GitHub repository](https://github.com/alitursucular/color-codes-conversion-website-demo).

I love math and I enjoy diving into the logic of things that I use. Color codes are one of them. Every color can be represented by different types and each type has different properties/areas of usage. (For example in web development, we generally use HEX and RGB(a),while offset printing uses CMYK) So the question came to my mind; what's the math behind it? _Note that: I am not an expert on color profiles, I am only interested in the conversion math._

**The UI:**
First version of this project dates back to 5 years. I have revised the UI of the site for the sake of this blog post. Pages previously had PHP extension but, since GitHub Pages does not host server-side languages, I switched to plain HTML. In addition to that, previous version was using Bootstrap v3.3.1 so, I also changed it to the current version and updated the grid & classes accordingly. Website is partially responsive, since the landing page is full of transitions. So rather than playing with media queries, I preferred to make an extra page to be loaded only if mobile (index-mobile.html). In the previous version, mobile detection was handled by PHP mobile detection class. However, in this version, I used jQuery method despite its downsides<sup>1</sup>. User can enter 6 different types of color profiles. Advanced input field solves many typing mistakes / styles and makes the calculation. If it can't solve the input, it displays an error message with many typing hints. The given input is not only converted, but also becomes the background color. It is important to note that, since background color of the site changes depending on the given color value, it is highly possible to have a readibility issue. To overcome this, I calculate the contrast of the given color and change several text colors to either black or white. Once the input field is cleared, everything goes back to its initial state.

To begin with, since this project enables conversions between 6 different profiles, there are many functions to deal with. Instead of going to through them all, I will only focus on the HEX to RGB conversion. The rest can be found on my [GitHub repository](https://github.com/alitursucular/color-codes-conversion-website-demo).

A hex triplet is a six-digit, three-byte hexadecimal number used in HTML, CSS, SVG, and other computing applications to represent colors.<sup>2</sup> The RGB color model is an additive color model in which red, green, and blue light are added together in various ways to reproduce a broad array of colors. The name of the model comes from the initials of the three additive primary colors, red, green, and blue.<sup>3</sup> Before we take a look at HEX to RGB conversion, we first need to validate user input so it can be processed:

```javascript
// remove all whitespaces and assign to a variable
var univinput = $("#univinput").val().replace(/\s+/g, "");
// convert lowercase letters to uppercase
var univinput = univinput.toUpperCase();
// regexp for every character except numbers, a,A, b,B, c,C, d,D, e,E, f,F and #
var hexinputvalidate = new RegExp(/[^a-fA-F\d\s:\#]/g);
```

We begin by removing whitespaces. Secondly, HEX color code comes with # as the first letter (i.e.: #00AA3C). To ease things for the user, our convertor accepts inputs without # too. In addition to that, HEX code may contain letters from A to F. Although it is not a must, I convert letters to uppercase to ease my conversion. Lastly, user may enter letters other than A to F; so we also need to take this into account to be processed later. I found RegExp useful for that. For the general validation structure:

```javascript
$("#hex").click(function() {
    clearerrors();
    var univinput = $('#univinput').val().replace(/\s+/g, ''); // remove all whitespaces and assign to a variable
    var univinput = univinput.toUpperCase(); // convert lowercase letters to uppercase
    var hexinputvalidate = new RegExp(/[^a-fA-F\d\s:\#]/g); // regexp for every character except numbers, a,A, b,B, c,C, d,D, e,E, f,F and #

    if ((univinput.substr(0, 1) == '#' && univinput.length == 7) || univinput.length == 6) { // 6 digit hex input with # || without #
        if (univinput.substr(0, 1) == '#') {
            var univinput = univinput.substr(1, univinput.length);
        }
        if (!$('#univinput').val().match(hexinputvalidate)) { // check for defined regexp match
            var hex_raw_r = univinput.substr(0, 2); // r part of hex is subtracted
            var hex_raw_g = univinput.substr(2, 2); // g part of hex is subtracted
            var hex_raw_b = univinput.substr(4, 2); // b part of hex is subtracted            
            // Send above variables to conversion function and print results to HTML.
        } else {
            return err_corrupted_hex_6(); // invalid 6 digit hex!
        }
    } else if ((univinput.substr(0, 1) == '#' && univinput.length == 4) || univinput.length == 3) { // 3 digit hex input with # || without #
        if (univinput.substr(0, 1) == '#') {
            var univinput = univinput.substr(1, univinput.length);
        }
        if (!$('#univinput').val().match(hexinputvalidate)) { // check for defined regexp match
            var hex_raw_r = univinput.substr(0, 1) + univinput.substr(0, 1); // r part of 3 digit hex is subtracted and cloned
            var hex_raw_g = univinput.substr(1, 1) + univinput.substr(1, 1); // g part of 3 digit hex is subtracted and cloned
            var hex_raw_b = univinput.substr(2, 1) + univinput.substr(2, 1); // b part of 3 digit hex is subtracted and cloned
            // Send above variables to conversion function and print results to HTML.
        } else {
            return err_corrupted_hex_3(); // invalid 3 digit hex!
        }
    } else {
        return err_invalid_hex(); // invalid hex format!
    }
});
```

The above click function is basically a _bridge_ between the _user input_ and the _conversion function_. As it is mentioned above, it first formats the user input. Secondly, it detects whether it is 6 digit or 3 digit HEX; as well as whether it contains a # or not. (Note that, some HEX values can be represented in 3 digits. Since the six digits of a hex code are in fact three two-digit numbers that represents red, green and blue; special pairs can be represented with only 3 digits. _(As an example: #112233 is same as #123 or #AAAAAA is same as #AAA)_. Thirdly, we look for any unwanted characters in the input. If it has been successful until this point, we separate r, g, b pairs and send them to the conversion individually:

_It is important to note that, each above step has an else statement where user is prompted with relevant error!_

```javascript
var r_hex_to_rgb_final = hex_seperator_convertor(hex_raw_r); // r pair
var g_hex_to_rgb_final = hex_seperator_convertor(hex_raw_g); // g pair
var b_hex_to_rgb_final = hex_seperator_convertor(hex_raw_b); // b pair
```

The general math is very simple. We are sure that our conversion function received two digits _(Such as: 23, 95, A4, F7 etc.)_. I will be referring first digit as `X` and the second digit as `Y`. What is left to calculate is:

```javascript
XY = X * 16 + Y
// If received R digits are 2 and 3, then the math will be:
R = 2 * 16 + 3
```

Since we finally made it to the conversion, let's see the code and analyze:

```javascript
function hex_seperator_convertor(a) {
  // r g b parts of 6-digit hex input is seperated, letters are converted to int and rgb is calculated
  var x = a.substr(0, 1);
  var y = a.substr(1, 1);
  if (Math.floor(x) == x && $.isNumeric(x)) { // check for numeric and integer - first half
    var numequofhex = parseInt(x);
  } else {
    var hexarray = ["A", "B", "C", "D", "E", "F"];
    var numequofhex = parseInt(hexarray.indexOf(x) + 10); // replace with number, add 10 for 10's, convert to int
  }
  if (Math.floor(y) == y && $.isNumeric(y)) {
    // check for numeric and integer - second half
    var numequofhex2 = parseInt(y);
  } else {
    var hexarray = ["A", "B", "C", "D", "E", "F"];
    var numequofhex2 = parseInt(hexarray.indexOf(y) + 10); // replace with number, add 10 for 10's, convert to int
  }
  var hex_r = numequofhex * 16 + numequofhex2;
  return hex_r;
}
```

In our function, we first separate our digits and assign to x and y variables. Secondly, we look for letters for both x and y individually and calculate their number equivalents _(A = 10, B = 11, ... F = 15)_. Lastly, we apply the above math and return the variable. This cycle is repeated for all r, g and b pairs.

After the conversion, RGB is formed and printed to the HTML:

```javascript
var hex_to_rgb_final = "rgb(" + r_hex_to_rgb_final + ", " + g_hex_to_rgb_final + ", " + b_hex_to_rgb_final + ")"; // form rgb
$('.rgb-result').attr('value', hex_to_rgb_final); // print to html
```

**Bonus note:** For RGB, theoretical bottom value is 0 and upper value is 255. (respectively white and black). White is `#000000` in HEX; so the conversion leads to _0_ for all digits. `#FFFFFF` means black in HEX so the conversion is _15 * 16 + 15 = 256_ for all digits.

**Sad note:** This project was live 5 years ago under the domain name of _colorconversion.co_. However, there are many online tools, image editing softwares and code editors gives you flexibility to work with different color profiles. Therefore, I found no business advantage of keeping it live; instead added to my portfolio.

**Note to self:** I found many parts which, could be improved. It is good to review your work and see the progress you have made. 

Thanks for reading! Please feel free to contact me and share your thoughts.

Here is the [demo](https://alitursucular.github.io/color-codes-conversion-website-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/color-codes-conversion-website-demo).

<sup>1</sup> _https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device_<br/>
<sup>2</sup> _https://en.wikipedia.org/wiki/Web_colors_<br/>
<sup>3</sup> _https://en.wikipedia.org/wiki/RGB_color_model_