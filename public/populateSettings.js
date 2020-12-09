const populate = settings => {
    console.log(settings);
    for ([name, value] of Object.entries(settings)) {
        console.log(name, value);
        document.getElementById(name).value = value;
    }
};
