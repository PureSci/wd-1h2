const colorSets = [
    {
        colors: ['#e9c46a', '#264653', '#e76f51', '#2a9d8f', '#e9c46a'],
    },

    {
        colors: ['#223d49', '#ffe08a', '#ac5039', '#fff0c7', '#2a9d8f'],
    },

    {
        colors: ['#f6f7f9', '#212428', '#00ff00', '#313130', '#00bb00'],
    },

    {
        colors: ['#0e101a', '#ffffff', '#0d8065', '#f0f2fc', '#aff2ea'],
        source: '<b>Inspiration:</b><br>Grammarly'
    },

    {
        colors: ['#1d3557', '#f1faee', '#e63946', '#a8dadc', '#457b9d'],
    },

    {
        colors: ['#f1faee', '#1d3557', '#a8dadc', '#06446a', '#ffc7cc'],
    },

    {
        colors: ['#fffbe5', '#000814', '#ffc300', '#001d3d', '#003566'],
    },

    {
        colors: ['#344e41', '#dad7cd', '#3a5a40', '#b5c49c', '#588157'],
    },

    {
        colors: ['#2b2d42', '#edf2f4', '#d90429', '#8d99ae', '#201f33'],
    },

    {
        colors: ['#212529', '#f8f9fa', '#343a40', '#e9ecef', '#adb5bd'],
    },

    {
        colors: ['#231942', '#ffebf5', '#5e548e', '#efd9f2', '#8d73b0'],
    },

    {
        colors: ['#ffffff', '#191919', '#405bff', '#212121', '#ebff38'],
        source: '<b>Inspiration:</b><br>LaunchDarkly'
    },

    {
        colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#ff9c07'],
    },

    {
        colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#44d62c'],
        source: '<b>Inspiration:</b><br>Razer'
    },

    {
        colors: ['#ff8bff', '#193718', '#ff8bff', '#5eaa67', '#e9ffe8'],
        source: '<b>Inspiration:</b><br>OpenAI ChatGPT'
    },

    {
        colors: ['#000000', '#ffffff', '#000000', '#f2f2f2', '#000000'],
    },

    {
        colors: ['#000000', '#ffffff', '#0049db', '#f2f2f2', '#ff6bc1'],
    },

    {
        colors: ['#0f1419', '#ffffff', '#1d9bf0', '#f7f7f7', '#8ecdf7'],
        source: '<b>Inspiration:</b><br>Twitter'
    },

    {
        colors: ['#0f1419', '#ffffff', '#ffd400', '#f2f2f2', '#ffe97f'],
    },

    {
        colors: ['#fbf5d4', '#0099ab', '#5a39d0', '#006374', '#2156c0'],
        source: '<b>Inspiration:</b><br>Retro 80s Nike Jacket'
    },

    {
        colors: ['#000000', '#e7e7d7', '#006338', '#deded0', '#006338'],
        source: '<b>Inspiration:</b><br>Retro 80s Nike Jacket'
    },

    {
        colors: ['#0f1419', '#ffffff', '#f91880', '#f2f2f2', '#fc8bbf'],
    },

    {
        colors: ['#0f1419', '#ffffff', '#8756FF', '#f2f2f2', '#bbaaff'],
    },

    {
        colors: ['#0f1419', '#ffffff', '#ff7a00', '#f2f2f2', '#ffbc7f'],
    },

    {
        colors: ['#0f1419', '#ffffff', '#00ba7c', '#f2f2f2', '#7fdcbd'],
    },

    {
        colors: ['#006374', '#fbf5d4', '#5a39d0', '#cbddca', '#5a39d0'],
    },

    {
        colors: ['#0e101a', '#ffffff', '#ff686b', '#fff6f5', '#84dcc6'],
    },

    {
        colors: ['#584b53', '#fef5ef', '#9d5c63', '#ffffff', '#e4bb97'],
    },

    {
        colors: ['#424b54', '#ffffff', '#9b6a6c', '#e6eaeb', '#e2b4bd'],
    },

    {
        colors: ['#ffffff', '#1f2041', '#ffc857', '#4b3f72', '#ffc857'],
    },

    {
        colors: ['#050505', '#ffffff', '#121212', '#f6f5f4', '#ffb600'],
        source: '<b>Inspiration:</b><br>Notion'
    },

    {
        colors: ['#ffffff', '#000000', '#9d34da', '#1a1a1a', '#bd73e8'],
        source: '<b>Inspiration:</b><br>Notion AI'
    },

    {
        colors: ['#2b1c50', '#ffffff', '#565add', '#d1d1f7', '#9f92ec'],
        source: '<b>Inspiration:</b><br>Loom'
    },

    {
        colors: ['#00031f', '#ffffff', '#0b5cff', '#ffffff', '#00ede7'],
        source: '<b>Inspiration:</b><br>Zoom'
    },

    {
        colors: ['#000000', '#ffffff', '#611f69', '#f4ede4', '#ecb22e'],
        source: '<b>Inspiration:</b><br>Slack'
    },

    {
        colors: ['#171a22', '#ffffff', '#ff622d', '#f7f7f7', '#421983'],
        source: '<b>Inspiration:</b><br>SEMRush'
    },

    {
        colors: ['#000000', '#9de2d4', '#e27d5f', '#95d6d2', '#d3bbc2'],
    },

    {
        colors: ['#fffbff', '#252cbb', '#ca3f66', '#2e35c2', '#ffccda'],
    },

    {
        colors: ['#ffffff', '#4887b0', '#fbeec1', '#3f7897', '#fbeec1'],
    },

    {
        colors: ['#05396b', '#5cdb94', '#edf5e0', '#8de4af', '#05396b'],
    },

    {
        colors: ['#fcfcfc', '#151515', '#f54c28', '#1b1918', '#689775'],
    },

    {
        colors: ['#5d5c61', '#b4c6da', '#557a95', '#d0dce7', '#7a747b'],
    },

    {
        colors: ['#2e1115', '#ffffff', '#4f1b1d', '#eaeff2', '#83687b'],
    },

    {
        colors: ['#fcfcfc', '#000000', '#4201ff', '#171717', '#230090'],
    },

    {
        colors: ['#e5fffd', '#0b0c12', '#66fcf1', '#202833', '#c5c6c8'],
    },

    {
        colors: ['#2c221e', '#e3e2de', '#e10243', '#e5d1d6', '#9b1750'],
    },

    {
        colors: ['#6c6b66', '#f1f0eb', '#f13c1f', '#fff8e5', '#4056a1'],
    },

    {
        colors: ['#d6d6d6', '#272727', '#10f49c', '#424242', '#ffe401'],
    },

    {
        colors: ['#fdfffe', '#2f4455', '#da7b93', '#376f70', '#2e151b'],
    },

    {
        colors: ['#646561', '#eae8dc', '#e85a50', '#e6e2cc', '#977d59'],
    },

    {
        colors: ['#ededed', '#222546', '#29658a', '#474866', '#d1d2d6'],
    },

];

function randomizeColors() {
    let randomColorSet;

    do {
        randomColorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
    } while (randomColorSet === lastSelectedColorSet);

    lastSelectedColorSet = randomColorSet;

    primaryColor.value = randomColorSet.colors[0];
    secondaryColor.value = randomColorSet.colors[1];
    primbuttnColor.value = randomColorSet.colors[2];
    secbuttnColor.value = randomColorSet.colors[3];
    accentColor.value = randomColorSet.colors[4];

    document.documentElement.style.setProperty('--primary', randomColorSet.colors[0]);
    document.documentElement.style.setProperty('--secondary', randomColorSet.colors[1]);
    document.documentElement.style.setProperty('--primbuttn', randomColorSet.colors[2]);
    document.documentElement.style.setProperty('--secbuttn', randomColorSet.colors[3]);
    document.documentElement.style.setProperty('--accent', randomColorSet.colors[4]);

    if (randomColorSet.source) {
        const sourceDiv = document.createElement('div');
        sourceDiv.innerHTML = randomColorSet.source;
        sourceDiv.classList.add('color-source');
        document.body.appendChild(sourceDiv);
    }







    // contrast checker

    const primbuttnColorValue = primbuttnColor.value;

    primaryButtons.forEach(primaryButton => {
        const primaryColorValue = primaryColor.value;
        const secondaryColorValue = secondaryColor.value;

        const primaryBrightness = getBrightness(primaryColorValue);
        const secondaryBrightness = getBrightness(secondaryColorValue);

        const contrastRatio = getContrastRatio(primbuttnColorValue, primaryColorValue);

        if (primaryBrightness < secondaryBrightness) {
            if (contrastRatio < 4.5) {
                primaryButton.style.color = 'var(--secondary)';
                primbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                primaryButton.style.color = 'var(--primary)';
                primbuttnColorClass.style.color = 'var(--primary)';
            }
        }

        if (primaryBrightness > secondaryBrightness) {
            if (contrastRatio < 4.5) {
                primaryButton.style.color = 'var(--secondary)';
                primbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                primaryButton.style.color = 'var(--primary)';
                primbuttnColorClass.style.color = 'var(--primary)';
            }
        }

    });

    const secbuttnColorValue = secbuttnColor.value;

    faqQuestions.forEach(faqQuestion => {
        const primaryColorValue = primaryColor.value;
        const secondaryColorValue = secondaryColor.value;

        const primaryBrightness = getBrightness(primaryColorValue);
        const secondaryBrightness = getBrightness(secondaryColorValue);

        const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

        if (primaryBrightness < secondaryBrightness) {
            if (contrastRatio < 4.5) {
                faqQuestion.style.color = 'var(--secondary)';
                secbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                faqQuestion.style.color = 'var(--primary)';
                secbuttnColorClass.style.color = 'var(--primary)';
            }
        }

        if (primaryBrightness > secondaryBrightness) {
            if (contrastRatio < 4.5) {
                faqQuestion.style.color = 'var(--secondary)';
                secbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                faqQuestion.style.color = 'var(--primary)';
                secbuttnColorClass.style.color = 'var(--primary)';
            }
        }

    });

    secondaryButtons.forEach(secondaryButton => {
        const primaryColorValue = primaryColor.value;
        const secondaryColorValue = secondaryColor.value;

        const primaryBrightness = getBrightness(primaryColorValue);
        const secondaryBrightness = getBrightness(secondaryColorValue);

        const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

        if (primaryBrightness < secondaryBrightness) {
            if (contrastRatio < 4.5) {
                secondaryButton.style.color = 'var(--secondary)';
                secbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                secondaryButton.style.color = 'var(--primary)';
                secbuttnColorClass.style.color = 'var(--primary)';
            }
        }

        if (primaryBrightness > secondaryBrightness) {
            if (contrastRatio < 4.5) {
                secondaryButton.style.color = 'var(--secondary)';
                secbuttnColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                secondaryButton.style.color = 'var(--primary)';
                secbuttnColorClass.style.color = 'var(--primary)';
            }
        }

    });

    const accentColorValue = accentColor.value;

    partTwo.forEach(partTwo => {
        const primaryColorValue = primaryColor.value;
        const secondaryColorValue = secondaryColor.value;

        const primaryBrightness = getBrightness(primaryColorValue);
        const secondaryBrightness = getBrightness(secondaryColorValue);

        const contrastRatio = getContrastRatio(accentColorValue, primaryColorValue);

        if (primaryBrightness < secondaryBrightness) {
            if (contrastRatio < 4.5) {
                partTwo.style.color = 'var(--secondary)';
                accentColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                partTwo.style.color = 'var(--primary)';
                accentColorClass.style.color = 'var(--primary)';
            }
        }

        if (primaryBrightness > secondaryBrightness) {
            if (contrastRatio < 4.5) {
                partTwo.style.color = 'var(--secondary)';
                accentColorClass.style.color = 'var(--secondary)';
            }
            else if (contrastRatio > 4.5) {
                partTwo.style.color = 'var(--primary)';
                accentColorClass.style.color = 'var(--primary)';
            }
        }

    });


}