export const REFERENCE_EXPRESSIONS = [
  {
    "id": "maintain-shapes-stroke-width",
    "name": "Maintain Shape's Stroke Width",
    "description": "Keeps the stroke width of a shape layer consistent even when you Scale the shape layer itself from the Transform property.",
    "tags": "",
    "preview_url": "https://raw.githubusercontent.com/BI11Y67/AE-Expression-Store/main/NEW%20GIFS_aees.socrazymedia.com/Maintain%20Shape's%20Stroke%20Width.gif",
    "code": "value / length(toComp([0,0]), toComp([0.7071,0.7071])) || 0.001;"
  },
  {
    "id": "maintain-shapes-scale-parented",
    "name": "Maintain Shape's Scale (Parented)",
    "description": "Keeps the layer's visual scale locked, even if the parent layer is scaled.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Maintain%20Shape%27s%20Scale%20(Parented).gif",
    "code": "s = []; \n            ps = parent.transform.scale.value; \n            for (i = 0; i < ps.length; i++){ \n                s[i] = value[i]*100/ps[i]; \n            } \n            s"
  },
  {
    "id": "in-bounce-animation-left-right",
    "name": "In Bounce Animation (Left - Right)",
    "description": "This makes Bounce in Animation.",
    "tags": "bounce animation inertial",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/In%20Bounce%20Animation%20(Left%20-%20Right).gif",
    "code": "freq = 3;\n            decay = 5;\n            amp = 50;\n            \n            t = time - inPoint;\n            value + amp * Math.sin(freq * Math.PI * 2 * t) / Math.exp(decay * t);"
  },
  {
    "id": "in-bounce-animation-top-bottom",
    "name": "In Bounce Animation (Top - Bottom)",
    "description": "This is the same In Bounce Expression (left - right) what is unique in this is, There is some other\n                properties which let's you control where you want you shape after the bounce and it also falls from the top to Bottom.",
    "tags": "bounce animation advanced control",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/In%20Bounce%20Animation%20(Top%20-%20Bottom).gif",
    "code": "// How far off-center the initial drop is (pixels)\n                initialDrop = 200;\n                \n                // How much bounce amplitude after the drop (pixels)\n                bounceArea = 50; \n                \n                // Bounce frequency (bounces per second) and decay\n                freq = 5;  // CHANGED: 100 was too fast (invisible vibration)\n                decay = 10;\n                \n                // Time setup\n                t = time - inPoint;\n                duration = 0.5; // Duration of drop phase\n                \n                // Calculate the center position (Y)\n                centerY = thisComp.height / 2;\n                \n                // 1. Calculate drop position\n                // (Moves from 'centerY - initialDrop' to 'centerY' over half duration)\n                basePos = linear(t, 0, duration/2, centerY - initialDrop, centerY);\n                \n                // 2. Calculate bounce (only runs after the drop phase)\n                if (t < duration/2) {\n                    bounce = 0; \n                } else {\n                    // Time since bounce phase started\n                    bounceTime = t - duration/2;\n                    // Create diminishing bounce\n                    bounce = bounceArea * Math.sin(freq * Math.PI * 2 * bounceTime) / Math.exp(decay * bounceTime);\n                }\n                \n                // 3. Final Output\n                y = basePos + bounce;\n                \n                // Return [x, y] because Position is a 2D property\n                [value[0], y];"
  },
  {
    "id": "reverse-keyframe-animation",
    "name": "Reverse Keyframe /Animation",
    "description": "This expression make the animation in Reverse with the help of Math, which means the Shape layer which was moving in the right direction will now move in the left direction.",
    "tags": "reverse animation mirror",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Reverse%20Keyframe%20or%20Animation.gif",
    "code": "compCenter = thisComp.width / 2;\n                newX = (compCenter - transform.position[0]) + compCenter;\n                [newX, value[1]];"
  },
  {
    "id": "floating-ball-animation",
    "name": "Floating Ball Animation",
    "description": "You can use this on a shape when you need a floating ball animation. Make sure to\n                link that property to a null so it's position is 0 before applying this expression",
    "tags": "math sin wave",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "x=value[0]\n                a=240\n                f=.5\n                t=time-inPoint;\n                y=Math.sin(t*2*Math.PI*f)*a;\n                [x,y]"
  },
  {
    "id": "math-cos-smooth-rotation",
    "name": "Math.cos() /Smooth Rotation",
    "description": "Apply this on a Shape's Rotation Property and it's gives some smooth smooth in and out rotation Animation",
    "tags": "math cos wave",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "a=45;\n                f=.5;\n                t=time-inPoint;\n                y=Math.cos(t*2*Math.PI*f)*a;\n                y"
  },
  {
    "id": "auto-center-text",
    "name": "Auto-Center Text",
    "description": "Automatically realigns the anchor and text as you type to maintain symmetry.",
    "tags": "anchor point advance text center",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Auto-center the anchor point\n                var rect = sourceRectAtTime(time, false);\n                [rect.left + rect.width/2, rect.top + rect.height/2, 0]"
  },
  {
    "id": "dynamic-text-box",
    "name": "Dynamic Text Box",
    "description": "Automatically resizes the background shape to fit your text length.",
    "tags": "text box rectangle size resize",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Get the text layer's dimensions\n                var textLayer = thisComp.layer(\"text\");\n                var textRect = textLayer.sourceRectAtTime(time, false);\n                \n                // Add margins (adjust these values as needed)\n                var marginX = 20;\n                var marginY = 10;\n                \n                // Set rectangle size based on text size plus margins\n                [textRect.width + marginX*2, textRect.height + marginY*2]"
  },
  {
    "id": "font-switcher",
    "name": "Font Switcher",
    "description": "Changes the layer's font style based on the slider value (Don't forget to add the Slider Control effect on Text Layer).",
    "tags": "change text font",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "var fontArray = [\n                \"OPTIBodoni-Antiqua\",\n                \"Poppins-Italic\",\n                \"Platypi-Light\",\n                \"Montserrat-SemiBold\"\n                ];\n                v = Math.round(effect(\"Slider Control\")(\"Slider\")); // Removed extra bracket\n                style.setFont(fontArray[v]);"
  },
  {
    "id": "remote-text-control",
    "name": "Remote Text Control",
    "description": "Links this text to a master controller. Simply edit the text inside Comp 2, and it will instantly update here in Comp 1 without you needing to switch comps.",
    "tags": "link text comp external",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "//make sure to change the comp and layer name\n                    comp(\"Comp2\").layer(\"text\").text.sourceText"
  },
  {
    "id": "local-posterize-time",
    "name": "Local Posterize Time",
    "description": "Restricts the frame rate of this specific property. Ideal for adding \"organic\" jitter to smooth digital movements.",
    "tags": "posterize time fps stop motion",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "posterizeTime(4);\n                value"
  },
  {
    "id": "single-segment-pingpong",
    "name": "Single-Segment PingPong",
    "description": "Loops the animation back and forth using only the last two keyframes.",
    "tags": "loop pingpong",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "loopOut(type = \"pingpong\", numKeyframes = 1)"
  },
  {
    "id": "continuous-offset-loop",
    "name": "Continuous Offset Loop",
    "description": "Creates a never-ending animation by adding the last keyframe's value to the next cycle. Perfect for infinite scrolling or rotating.",
    "tags": "loop offset infinite",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "loopOut(type = \"offset\", numKeyframes = 0)"
  },
  {
    "id": "local-wiggle-controller",
    "name": "Local Wiggle Controller",
    "description": "Adds a Point Control directly to the layer to manage wiggle frequency and amplitude. This keeps your timeline clean by eliminating the need for extra Null layers.",
    "tags": "wiggle custom shake",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "wiggle(effect(\"Point Control\")(\"Point\")[0],effect(\"Point Control\")(\"Point\")[1])"
  },
  {
    "id": "value-lock",
    "name": "Value Lock",
    "description": "Forces a property to remain at a fixed value (100) regardless of manual adjustments or keyframes.",
    "tags": "clamp lock layer",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "clamp(value, 100, 100)"
  },
  {
    "id": "constant-time-offset",
    "name": "Constant Time Offset",
    "description": "Delays the property's animation by exactly 1 second. Useful for creating staggered motion or secondary animation.",
    "tags": "delay time animation",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "valueAtTime(time - 1); // Delayed motion"
  },
  {
    "id": "seeded-low-fi-random",
    "name": "Seeded Low-Fi Random",
    "description": "Generates a unique, stepped random value for each layer. Using seedRandom ensures each layer gets a different result, while posterizeTime controls the \"jitter\" speed.",
    "tags": "random static posterize",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "posterizeTime(2);\n                seedRandom(index, false);\n                r = random(200, 100);\n                [r, r] // Tells AE to use the random number for both X and Y"
  },
  {
    "id": "dynamic-ease-mapping",
    "name": "Dynamic Ease Mapping",
    "description": "Maps time to a value range with built-in easing. Unlike a linear transition, this starts slowly and decelerates at the end for more natural movement.",
    "tags": "smooth keyframe ease",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "ease(time, 0, 5, 0, 100);"
  },
  {
    "id": "dynamic-3x5-auto-scaling-shape-grid",
    "name": "Dynamic 3x5 Auto-Scaling Shape Grid",
    "description": "This setup creates a grid of 15 shapes (5 columns by 3 rows) that you can control globally using a single Null Object. By using expressions, you can adjust the size, spacing, and selection of the shapes without having to edit each layer individually.",
    "tags": "card animation system",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// variables //\n                var select = thisComp.layer(\"controls\").effect(\"Select\")(\"Slider\");\n                var padding = thisComp.layer(\"controls\").effect(\"Padding\")(\"Slider\");\n                var id = thisLayer.index;\n                \n                // calculations //\n                if (select > id) {\n                    x = ease(select, id, id + padding, value[0]*thisComp.layer(\"controls\").effect(\"the size of the shape\")(\"Slider\"), value[0]);\n                } else {\n                    x = ease(select, id - padding, id, value[0], value[0]*thisComp.layer(\"controls\").effect(\"the size of the shape\")(\"Slider\"));\n                }\n                \n                // outputs //\n                [x,x]"
  },
  {
    "id": "dynamic-multi-layer-index-rotation",
    "name": "Dynamic Multi-Layer Index Rotation",
    "description": "This expression automates the rotation of multiple layers based on their stack order. It creates\n                a responsive, procedural animation controlled by a single \"CONTROLLER\" Null. Select: Adjusts the base rotation or target layer focus. Padding: Sets the rotational offset (gap) between each layer.",
    "tags": "Dynamic Multi-Layer Index Rotation system",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "var select = thisComp.layer(\"#CONTROLER\").effect(\"Slider Control\")(\"Slider\");\n                var padding = thisComp.layer(\"#CONTROLER\").effect(\"Slider Control 2\")(\"Slider\");\n                var id = thisLayer.index;\n                \n                if (select > id)\n                \t{x=ease(select,id,id+padding,value+360,value);}\n                else\n                \t{x=ease(select,id,id-padding,value,value+360);}\n                \n                x"
  },
  {
    "id": "live-transform-hud",
    "name": "Live Transform HUD",
    "description": "Displays real-time transform data (Position, Scale, Rotation, and Opacity) from a target layer\n                onto a text layer. Perfect for technical UI designs and automated property labeling.",
    "tags": "Live Transform HUD debug",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Change the Name of the Layer \"Shape Layer 1\" to your layer name\n                x = thisComp.layer(\"Shape Layer 1\").transform.position[0];\n                y = Math.round(thisComp.layer(\"Shape Layer 1\").transform.position[1]);\n                x = Math.round(thisComp.layer(\"Shape Layer 1\").transform.position[0]);\n                s1 = Math.round(thisComp.layer(\"Shape Layer 1\").transform.scale[0]);\n                s2 = Math.round(thisComp.layer(\"Shape Layer 1\").transform.scale[1]);\n                r = Math.round(thisComp.layer(\"Shape Layer 1\").transform.rotation);\n                t = Math.round(thisComp.layer(\"Shape Layer 1\").transform.opacity)\n                                \n                // Output the HUD text\n\n                \"Position: \" + x + \" , \" + y +\n                \"\\nScale: \" +s1 +\" ,\"+ s2 +\n                \"\\nRotation: \" + r +\n                \"\\nOpacity: \" + t"
  },
  {
    "id": "3d-lookat-target-constraint",
    "name": "3D LookAt Target Constraint",
    "description": "Forces a 3D layer to constantly face a designated \"TargetLayer.\" This expression calculates the\n                necessary orientation to keep the target in sight, regardless of where either layer moves in 3D space.",
    "tags": "3D LookAt Target Constraint",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/3D%20LookAt%20Target%20Constraint.gif",
    "code": "// Ensure both layers are 3D enabled\n                    // Replace \"TargetLayer\" with the actual name of your target layer\n\n                    target = thisComp.layer(\"TargetLayer\");\n\n                    // Calculate the orientation to look at the target\n                    lookAt(thisLayer.position, target.position);"
  },
  {
    "id": "relative-position-tracker",
    "name": "Relative Position Tracker",
    "description": "Syncs a layer's position to another object (e.g., \"Null 1\") while allowing the layer to remain\n                independent. It converts Global Composition coordinates into Local Layer coordinates.",
    "tags": "track position 2d",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Relative%20Position%20Tracker.gif",
    "code": "// Change \"Null 1\" to the name of your target layer\n                    fromComp(thisComp.layer(\"Null 1\").position); // Convert comp space to layer space"
  },
  {
    "id": "keyframe-friendly-scripting",
    "name": "Keyframe-Friendly Scripting",
    "description": "Prevents an expression from \"locking\" your properties. This allows you to animate naturally with\n                keyframes while the expression runs simultaneously, adding its results to your manual animation.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Keyframe-Friendly%20Scripting.gif",
    "code": "// Use this expression to retain keyframe functionality\n                    +value"
  },
  {
    "id": "value-inversion-mirroring",
    "name": "Value Inversion (Mirroring)",
    "description": "Multiplies the property value by -1 to create a \"mirror\" effect. This is ideal for symmetrical\n                rigs where one side of a design must move in the exact opposite direction of the other.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Value%20Inversion%20(Mirroring).gif",
    "code": "// Inverts the current property value\n                    value * -1;"
  },
  {
    "id": "2d-auto-orient-look-at",
    "name": "2D Auto-Orient / Look-At",
    "description": "A trigonometric expression applied to the Rotation property that dynamically calculates the angle\n                required for a layer to continuously face a target layer.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/2D%20Auto-Orient%20Look-At.gif",
    "code": "targetLayer = {pickwhip this to the layer you want to look at};\n                \n                xDistance = targetLayer.transform.position[0] - transform.position[0];\n                yDistance = targetLayer.transform.position[1] - transform.position[1];\n                \n                radians = Math.atan2(yDistance, xDistance);\n                \n                radiansToDegrees(radians);"
  },
  {
    "id": "luma-scale-driver",
    "name": "Luma Scale Driver",
    "description": "Samples the luminance (brightness) of a target layer to drive the scale property. White values produce 100% scale, while black values produce 0%. Note: You must have a source layer in your composition that contains Black & White (Luminance) information. Example: Create a Solid layer, apply the Gradient Ramp effect, and animate the gradient colors or positions. The shape layer's scale will automatically react to the changing brightness.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Luma%20Scale%20Driver.gif",
    "code": "var sample = thisComp.layer(\"MAIN ANIMATION\").sampleImage(position, [1, 1]);\n                var sampleHSL = rgbToHsl(sample);\n                \n                var newScale = linear(sampleHSL[2], 0, 1, 0, 100);\n                \n                [newScale, newScale];"
  },
  {
    "id": "absolute-world-position-tracker",
    "name": "Absolute World Position Tracker",
    "description": "Converts a layer's local anchor point into global composition coordinates. This allows you to\n                track the exact screen position of a layer, even if it is parented or inside a complex hierarchy.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Converts the layer name to \"Car\" or your desired layer\n\n                    L = thisComp.layer(\"Car\");\n                    L.toWorld(L.anchorPoint);"
  },
  {
    "id": "auto-grid-layout",
    "name": "Auto Grid Layout",
    "description": "Automatically arranges shape layers in a grid pattern based on a padding value from a null layer.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Make sure to have a Null layer named \"Null 13\" with a Slider Control for padding\n                padding = thisComp.layer(\"Null 13\").effect(\"Slider Control\")(\"Slider\");     \n                numberOfColumns = Math.ceil(thisComp.width / padding)+1;\n                \n                xValue = padding * ((index-1) % numberOfColumns);\n                yValue = padding * Math.floor((index-1) / numberOfColumns);\n                \n                [value[0]+xValue, value[1] + yValue];"
  },
  {
    "id": "seamless-looping-wiggle",
    "name": "Seamless Looping Wiggle",
    "description": "A dual-timeline expression that uses a cross-fade to eliminate \"jumps\" in random movement, creating a perfect repeat.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "frequency = 2; // wiggles per second\n                amplitude = 40; // amount of pixels to wiggle\n                secondsToLoop = 3; // time to loop in seconds. Change this to thisComp.duration if more appropriate\n                // --------\n                t = time % secondsToLoop;\n                wiggle1 = wiggle(frequency, amplitude, 1, 0.5, t);\n                wiggle2 = wiggle(frequency, amplitude, 1, 0.5, t - secondsToLoop);\n                linear(t, 0,  secondsToLoop, wiggle1, wiggle2)"
  },
  {
    "id": "half-frame-stutter",
    "name": "Half-Frame Stutter",
    "description": "Forces a property to update every second frame, creating a low-fps stop-motion aesthetic.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "if(timeToFrames() % 2 > 0){value}else{valueAtTime(time-thisComp.frameDuration)}"
  },
  {
    "id": "proportional-y-scaler",
    "name": "Proportional Y-Scaler",
    "description": "This expression scales the Y value proportionally to the X value.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// pickwhip the x value to scale proportionally\n                    xValue = {pickwhip this value to the x value};\n                \n                (xValue*thisComp.height)/thisComp.width"
  },
  {
    "id": "constant-auto-scale",
    "name": "Constant Auto-Scale",
    "description": "Automatically scales a layer up or down at a fixed speed starting from the layer's In-Point.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Adjust this value to control the speed of scaling\n                var scaleSpeed = 10;\n                var scaleFactor = (time-inPoint)*scaleSpeed;\n                value - [scaleFactor, scaleFactor]; // Use - to decrease and + to increase"
  },
  {
    "id": "constant-auto-scale-alt",
    "name": "Constant Auto-Scale",
    "description": "Automatically scales a layer up or down at a fixed speed starting from the layer's In-Point.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Adjust this value to control the speed of scaling\n                var scaleSpeed = 10;\n                var scaleFactor = (time-inPoint)*scaleSpeed;\n                value - [scaleFactor, scaleFactor]; // Use - to decrease and + to increase"
  },
  {
    "id": "typewriter-with-cursor",
    "name": "Typewriter with Cursor",
    "description": "Creates a typewriter effect with a blinking cursor.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// 1. Setup Blink Speed\n                var blinkControl = Math.sin(time * 15); // Increased speed to 15 for better visibility\n                \n                // 2. Check if Markers exist (Safety Check)\n                if (marker.numKeys >= 2) {\n                    var inTime = marker.key(1).time;\n                    var outTime = marker.key(2).time;\n                } else {\n                    // Default to start at 0s and end at 2s if you forgot markers\n                    var inTime = 0;\n                    var outTime = 2;\n                }\n                \n                // 3. Calculate Typewriter Progress\n                // Using 'value' instead of 'text.sourceText' is safer\n                var txt = value; \n                var charCount = linear(time, inTime, outTime, 0, txt.length);\n                var animation = txt.slice(0, Math.floor(charCount)); // Round down to whole letters\n                \n                // 4. Create the Final Output Variable\n                var finalOutput = \"\";\n                \n                if (time <= inTime) {\n                    // Phase 1: Waiting to start (Blinking Cursor only)\n                    finalOutput = (blinkControl < 0) ? \"|\" : \"\";\n                } else if (time < outTime) {\n                    // Phase 2: Typing (Text + Solid Cursor)\n                    finalOutput = animation + \"|\";\n                } else {\n                    // Phase 3: Finished (Text only, no cursor)\n                    finalOutput = animation;\n                }\n                \n                // 5. This last line is what actually shows up on screen\n                finalOutput;"
  },
  {
    "id": "proportional-y-scale-sync",
    "name": "The Proportional Y-Scale Sync",
    "description": "This expression creates a mathematical bridge between a Slider Control and a layer's Vertical Position. It normalizes a specific coordinate (in this case, -181.5) to a \"Home\" value of 100 on the slider. Once synced, any percentage change on the slider (e.g., moving from 100 to 120) triggers an identical percentage shift in the Y-position, keeping the movement perfectly proportional.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// 1. Get the Slider value\n                    var slider = thisComp.layer(\"CONTROLER\").effect(\"Animation_GRID\")(\"Slider\");\n                    \n                    // 2. Define your \"Home\" constants\n                    var original_y = -181.5; \n                    var slider_base = 100; // This tells AE: \"When slider is 100, Y should be -181.5\"\n                    \n                    // 3. Calculate the percentage factor\n                    // If slider is 110, factor is 1.1 (a 10% increase)\n                    var factor = slider / slider_base;\n                    \n                    // 4. Apply the factor to your Y coordinate\n                    var newY = original_y * factor;\n                    \n                    // Result: Keep your current X [0], apply the new calculated Y\n                    [value[0], newY]"
  },
  {
    "id": "path-flow-distributor-shape-layer",
    "name": "Path Flow Distributor(Shape Layer)",
    "description": "Automatically calculates spacing based on layer index. Usage: Apply to the Position property. Requires a source shape layer named \"MAIN PATH\" with \"OFFSET CONTROL\" and \"RANDOM POSITION\" sliders attached. Steps: 1. Create a Shape Layer named \"MAIN PATH\" & Make a Path with the Pen tool (Shape 1 > Path 1). 2. Add two Slider Controls to \"MAIN PATH\" named \"OFFSET CONTROL\" and \"RANDOM POSITION\". 3. Apply this expression to the Position property of the layers you want to distribute along the path. 4. Turn on the auto-orient for better effect. 5. Align the shape layer, then duplicate it to see the magic happen. OFFSET CONTROL: Adjusts the overall flow along the path. RANDOM POSITION: Adds random positional variation to each layer.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "let pathLayer = thisComp.layer(\"MAIN PATH\");\n                let thePath = pathLayer.content(\"Shape 1\").content(\"Path 1\").path;\n                let sliderOffset = thisComp.layer(\"MAIN PATH\").effect(\"OFFSET CONTROL\")(\"Slider\");\n                let offsetRepeat = sliderOffset % 100;\n                let offsetToAdd = linear(offsetRepeat, 0, 100, 1, 0);\n                \n                let pathOffset = linear(index, 0, thisComp.numLayers-1, 0, 1);\n                let myPos = thePath.pointOnPath((pathOffset+offsetToAdd)%1, time);\n                \n                seedRandom(index, true);\n                let posSlider = thisComp.layer(\"MAIN PATH\").effect(\"RANDOM POSITION\")(\"Slider\");\n                let randomPos = random([-posSlider, -posSlider], [posSlider, posSlider]);\n                \n                toComp(myPos) - thisComp.layer(\"MAIN PATH\").transform.position + randomPos;"
  },
  {
    "id": "dynamic-velocity-spring",
    "name": "Dynamic Velocity Spring",
    "description": "Apply to the Rotation property. Adjust rotateOnMovement for the lean intensity and decay for the spring duration. Align your shape, then duplicate the layer to see the magic happen!",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "let amp = 2.0; //Sets the angle that the layer will rotate on the spring animation\n                let freq = 2.0; //Sets the velocity that the spring animation will have\n                let decay = 4.0; //How long the spring animation lasts\n                let rotateOnMovement = 42; //Maximum angle that the layer will rotate when it's moving\n                let useAxis = 0; // 0 will use the speed of the X axis and 1 will use the speed of the Y axis\n                let timeBeforeKey = thisComp.frameDuration/10;\n                let refValue = position;\n                \n                if (refValue.velocity[useAxis] != 0) {\n                \tlinear(refValue.velocity[useAxis], -3000, 3000, -rotateOnMovement, rotateOnMovement);\n                } else {\n                \tlet n = 0;\n                \tif (refValue.numKeys > 0) {\n                \t\tn = refValue.nearestKey(time).index;\n                \t\tif (refValue.key(n).time > time) { n--; }\n                \t}\n                \tif (n == 0) {\n                \t\tt = 0;\n                \t} else {\n                \t\tt = time - refValue.key(n).time;\n                \t}\n                \tif (n > 0 && t < 1) {\n                \t\tlet v = refValue.velocityAtTime(refValue.key(n).time - timeBeforeKey)[useAxis];\n                \t\tvalue - (v*(amp/100)*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t));\n                \t} else {\n                \t\tvalue;\n                \t}\n                }"
  },
  {
    "id": "proximity-force-field",
    "name": "Proximity Force Field",
    "description": "Apply to the Position property. Requires a layer named \"SPACESHIP\" with a \"DEFLECT RADIUS\" slider. Align your shape, then duplicate the layer to see the magic happen! Steps: 1. Make a Mouse cursor Shape layer named \"SPACESHIP\" (You can use any shape). 2. Then Add a Slider Control named \"DEFLECT RADIUS\" to the \"SPACESHIP\" layer. 3. Add A circle shape and apply this expression to the Position property of the layers you want to be affected by the force field. 4. Now Change the \"DEFLECT RADIUS\" slider to see the effect and then Move the SPACESHIP from the program Moniter. DEFLECT RADIUS: Adjusts the strength of the force field.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Proximity%20Force%20Field.gif",
    "code": "//Getting the strength value of the force field\n                var reflectRadius = thisComp.layer(\"SPACESHIP\").effect(\"DEFLECT RADIUS\")(\"Slider\");\n                \n                //Calculating the total distance between the layers and the distance on each axis\n                var lengthX = value[0] - thisComp.layer(\"SPACESHIP\").transform.position[0];\n                var lengthY = value[1] - thisComp.layer(\"SPACESHIP\").transform.position[1];\n                var distance = length(value, thisComp.layer(\"SPACESHIP\").transform.position);\n                \n                //Calculating the angle between the layers,\n                //this will allow us to get how much force will be applied into each axis\n                \n                var angle = Math.atan2(lengthY, lengthX);\n                var cosine = Math.cos(angle);\n                var sine = Math.sin(angle);\n                var moveRadius = ease(distance, reflectRadius, 0, reflectRadius, 0);\n                \n                //Applying the final value\n                [value[0]+moveRadius*cosine, value[1]+moveRadius*sine];"
  },
  {
    "id": "auto-distribute",
    "name": "Auto-Distribute",
    "description": "This expression automatically calculates a layer's position based on the layer directly above it in the stack. When you duplicate the layer (Cmd+D or Ctrl+D), it pushes the new copy by a fixed horizontal amount (xOffset) while still allowing you to manually nudge the layer to fine-tune its placement.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "// Set your fixed horizontal gap here\n                var xOffset = -571.6;\n                \n                // Check if there is a layer above this one to reference\n                if (index < thisComp.numLayers && index > 1) {\n                    var prevPos = thisComp.layer(index - 1).transform.position;\n                    \n                    // Previous X + Offset + Current Layer's Manual Value\n                    var newX = prevPos[0] + xOffset + value[0];\n                    var newY = prevPos[1]; \n                \n                    [newX, newY];\n                } else {\n                    value; \n                }"
  },
  {
    "id": "dynamic-line-connector-between-two-shapes",
    "name": "Dynamic Line Connector Between Two Shapes",
    "description": "This setup creates a responsive line that automatically connects two layers (e.g., Shape 1 and Shape 2). Using expressions, the line updates in real time and stays attached to both shapes, even when they move, scale, or animate. This is useful for timelines, diagrams, and motion graphics where elements need to stay visually linked without manual adjustments.",
    "tags": "",
    "preview_url": "https://cdn.jsdelivr.net/gh/BI11Y67/AE-Expression-Store@main/NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif",
    "code": "p1 = thisComp.layer(\"Shape 1\").toComp([0,0]);\n                    p2 = thisComp.layer(\"Shape 2\").toComp([0,0]);\n                    \n                    createPath([p1, p2], [], [], false);"
  }
];
