import { copyToCanvas } from "../canvasCreators";

export const createPixelatedCanvas = (inputCanvas, edit) => {
    let {
            pixelsWide     = 58,
            showGrid       = false,
            pixelType      = 'square',
            minOutputSize  = 960,
            pixelsBgColour = '#000'
        } = edit;

    // draw input to small canvas matching the number of pixels needed.
    const pixelCanvas = document.createElement('canvas');
    const widthToHeightRatio = inputCanvas.height / inputCanvas.width;
    // needs to be floored because we're only adding whole blocks
    const pixelsHigh = Math.floor(pixelsWide * widthToHeightRatio);

    pixelCanvas.width = pixelsWide;
    pixelCanvas.height = pixelsHigh;
    copyToCanvas(inputCanvas, pixelCanvas, false);

    // create an output
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = Math.max(inputCanvas.width, minOutputSize);

    const blockSize = Math.round(outputCanvas.width / pixelsWide);
    outputCanvas.width = pixelsWide * blockSize;
    outputCanvas.height = pixelsHigh * blockSize;

    const inputCtx = pixelCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext("2d");

    let imageData = inputCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    let pixels = imageData.data;

    // fill with bg colour first
    outputCtx.fillStyle = pixelsBgColour;
    outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

    let r, g, b, a, x, y, i;
    const innerBlockSize = showGrid ? blockSize - 2 : blockSize;
    const circleRadius = innerBlockSize / 2;
    const lineThickness = Math.min(10 * (blockSize / 50), 10);
    const halfLineThickness = lineThickness / 2;
    const tubeRadius = circleRadius - halfLineThickness;
    const circleEndAngle = 2 * Math.PI;
    // const halfBlockSize = blockSize / 2;
    let characterCount = 0;
    const chars = theTimeMachineChapter2.toUpperCase();
    const textOutlineWidth = Math.min(10 * (blockSize / 50), 10);

    for (y = 0; y < pixelCanvas.height; y++) {
        for (x = 0; x < pixelCanvas.width; x++) {
            i = (x + (y * pixelCanvas.width)) * 4;

            r = pixels[i];
            g = pixels[i + 1];
            b = pixels[i + 2];
            a = pixels[i + 3];
            const pixelColour = `rgba(${r}, ${g}, ${b}, ${a})`;
            const left = x * blockSize;
            const top = y * blockSize;

            if (pixelType === "round") {
                drawRoundPixel(outputCtx, pixelColour, left, top, blockSize, { circleRadius, circleEndAngle });
            }
            else if (pixelType === "tube") {
                drawTubePixel(outputCtx, pixelColour, left, top, blockSize, { lineThickness, halfLineThickness, tubeRadius, circleEndAngle });
            }
            else if (pixelType === "diagonal") {
                drawDiagonalPixel(outputCtx, pixelColour, left, top, blockSize, { lineThickness });
            }
            else if (pixelType === "cross") {
                drawCrossPixel(outputCtx, pixelColour, left, top, blockSize, { lineThickness });
            }
            else if (pixelType === "text") {
                outputCtx.fillStyle = pixelColour;
                outputCtx.strokeStyle = pixelColour;
                outputCtx.lineWidth = textOutlineWidth;
                outputCtx.textBaseline = "top";
                outputCtx.font = `${blockSize}px Lucida Console`;

                if (characterCount > chars.length) {
                    characterCount = 0;
                }
                outputCtx.strokeText(chars[characterCount], left + halfLineThickness, top + halfLineThickness, blockSize);
                outputCtx.fillText(chars[characterCount], left + halfLineThickness, top + halfLineThickness, blockSize);

                characterCount++;
            }
            else if (pixelType === "box") {
                drawBoxPixel(outputCtx, pixelColour, left, top, blockSize, { lineThickness, halfLineThickness });
            }
            // default is square
            else {
                drawSquarePixel(outputCtx, pixelColour, left, top, blockSize);
            }
        }
    }

    return outputCanvas;
};

export const drawRoundPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              circleEndAngle = 2 * Math.PI,
              circleRadius   = size / 2
          } = loopVars;

    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x + circleRadius, y + circleRadius, circleRadius, 0, circleEndAngle);
    ctx.fill();
};

export const drawTubePixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              lineThickness     = 2,
              halfLineThickness = 1,
              tubeRadius        = (size / 2) - 1,
              circleEndAngle    = 2 * Math.PI
          } = loopVars;

    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(x + halfLineThickness + tubeRadius, y + halfLineThickness + tubeRadius, tubeRadius, 0, circleEndAngle);
    ctx.stroke();
};

export const drawSquarePixel = (ctx, colour, x, y, size) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

export const drawBoxPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              lineThickness     = 2,
              halfLineThickness = 1
          } = loopVars;

    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = colour;
    ctx.strokeRect(x + halfLineThickness, y + halfLineThickness, size - lineThickness, size - lineThickness);
};

export const drawDiagonalPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              lineThickness = 2
          } = loopVars;

    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();
};

export const drawCrossPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              lineThickness = 2
          } = loopVars;

    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.stroke();
};

export const drawTextPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              character        = "A",
              textOutlineWidth = 1
          } = loopVars;

    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.lineWidth = textOutlineWidth;
    ctx.textBaseline = "top";
    ctx.font = `${size}px Lucida Console`;

    ctx.strokeText(character, x + textOutlineWidth, y + textOutlineWidth, size);
    ctx.fillText(character, x + textOutlineWidth, y + textOutlineWidth, size);
};

const theTimeMachineChapter2 = "The thing the Time Traveller held in his hand was a glittering metallic framework, scarcely larger than a small clock, and very delicately made. There was ivory in it, and some transparent crystalline substance. And now I must be explicit, for this that follows—unless his explanation is to be accepted—is an absolutely unaccountable thing. He took one of the small octagonal tables that were scattered about the room, and set it in front of the fire, with two legs on the hearthrug. On this table he placed the mechanism. Then he drew up a chair, and sat down. The only other object on the table was a small shaded lamp, the bright light of which fell upon the model. There were also perhaps a dozen candles about, two in brass candlesticks upon the mantel and several in sconces, so that the room was brilliantly illuminated. I sat in a low arm-chair nearest the fire, and I drew this forward so as to be almost between the Time Traveller and the fireplace. Filby sat behind him, looking over his shoulder. The Medical Man and the Provincial Mayor watched him in profile from the right, the Psychologist from the left. The Very Young Man stood behind the Psychologist. We were all on the alert. It appears incredible to me that any kind of trick, however subtly conceived and however adroitly done, could have been played upon us under these conditions. The Time Traveller looked at us, and then at the mechanism. \"Well?\" said the Psychologist. \"This little affair,\" said the Time Traveller, resting his elbows upon the table and pressing his hands together above the apparatus, \"is only a model. It is my plan for a machine to travel through time. You will notice that it looks singularly askew, and that there is an odd twinkling appearance about this bar, as though it was in some way unreal.\" He pointed to the part with his finger. \"Also, here is one little white lever, and here is another.\" The Medical Man got up out of his chair and peered into the thing. \"It’s beautifully made,\" he said. \"It took two years to make,\" retorted the Time Traveller. Then, when we had all imitated the action of the Medical Man, he said: \"Now I want you clearly to understand that this lever, being pressed over, sends the machine gliding into the future, and this other reverses the motion. This saddle represents the seat of a time traveller. Presently I am going to press the lever, and off the machine will go. It will vanish, pass into future Time, and disappear. Have a good look at the thing. Look at the table too, and satisfy yourselves there is no trickery. I don’t want to waste this model, and then be told I’m a quack.\" There was a minute’s pause perhaps. The Psychologist seemed about to speak to me, but changed his mind. Then the Time Traveller put forth his finger towards the lever. \"No,\" he said suddenly. \"Lend me your hand.\" And turning to the Psychologist, he took that individual’s hand in his own and told him to put out his forefinger. So that it was the Psychologist himself who sent forth the model Time Machine on its interminable voyage. We all saw the lever turn. I am absolutely certain there was no trickery. There was a breath of wind, and the lamp flame jumped. One of the candles on the mantel was blown out, and the little machine suddenly swung round, became indistinct, was seen as a ghost for a second perhaps, as an eddy of faintly glittering brass and ivory; and it was gone—vanished! Save for the lamp the table was bare. Everyone was silent for a minute. Then Filby said he was damned. The Psychologist recovered from his stupor, and suddenly looked under the table. At that the Time Traveller laughed cheerfully. \"Well?\" he said, with a reminiscence of the Psychologist. Then, getting up, he went to the tobacco jar on the mantel, and with his back to us began to fill his pipe. We stared at each other. \"Look here,\" said the Medical Man, \"are you in earnest about this? Do you seriously believe that that machine has travelled into time?\" \"Certainly,\" said the Time Traveller, stooping to light a spill at the fire. Then he turned, lighting his pipe, to look at the Psychologist’s face. (The Psychologist, to show that he was not unhinged, helped himself to a cigar and tried to light it uncut.) \"What is more, I have a big machine nearly finished in there\"—he indicated the laboratory—\"and when that is put together I mean to have a journey on my own account.\" \"You mean to say that that machine has travelled into the future?\" said Filby. \"Into the future or the past—I don’t, for certain, know which.\" After an interval the Psychologist had an inspiration. \"It must have gone into the past if it has gone anywhere,\" he said. \"Why?\" said the Time Traveller. \"Because I presume that it has not moved in space, and if it travelled into the future it would still be here all this time, since it must have travelled through this time.\" \"But,\" said I, \"If it travelled into the  \" past it would have been visible when we came first into this room; and last Thursday when we were here; and the Thursday before that; and so forth!\" \"Serious objections,\" remarked the Provincial Mayor, with an air of impartiality, turning towards the Time Traveller. \"Not a bit,\" said the Time Traveller, and, to the Psychologist: \"You think. You can explain that. It’s presentation below the threshold, you know, diluted presentation.\" \"Of course,\" said the Psychologist, and reassured us. \"That’s a simple point of psychology. I should have thought of it. It’s plain enough, and helps the paradox delightfully. We cannot see it, nor can we appreciate this machine, any more than we can the spoke of a wheel spinning, or a bullet flying through the air. If it is travelling through time fifty times or a hundred times faster than we are, if it gets through a minute while we get through a second, the impression it creates will of course be only one-fiftieth or one-hundredth of what it would make if it were not travelling in time. That’s plain enough.\" He passed his hand through the space in which the machine had been. \"You see?\" he said, laughing. We sat and stared at the vacant table for a minute or so. Then the Time Traveller asked us what we thought of it all. \"It sounds plausible enough tonight,\" said the Medical Man; \"but wait until tomorrow. Wait for the common sense of the morning.\" \"Would you like to see the Time Machine itself?\" asked the Time Traveller. And therewith, taking the lamp in his hand, he led the way down the long, draughty corridor to his laboratory. I remember vividly the flickering light, his queer, broad head in silhouette, the dance of the shadows, how we all followed him, puzzled but incredulous, and how there in the laboratory we beheld a larger edition of the little mechanism which we had seen vanish from before our eyes. Parts were of nickel, parts of ivory, parts had certainly been filed or sawn out of rock crystal. The thing was generally complete, but the twisted crystalline bars lay unfinished upon the bench beside some sheets of drawings, and I took one up for a better look at it. Quartz it seemed to be. \"Look here,\" said the Medical Man, \"are you perfectly serious? Or is this a trick—like that ghost you showed us last Christmas?\" \"Upon that machine,\" said the Time Traveller, holding the lamp aloft, \"I intend to explore time. Is that plain? I was never more serious in my life.\" None of us quite knew how to take it. I caught Filby’s eye over the shoulder of the Medical Man, and he winked at me solemnly.";