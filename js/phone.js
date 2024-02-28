const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    };
    console.log('is show all', isShowAll)
    //display only first 12 phones ifd not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;

        phoneCard.innerHTML = `
        <div class="border rounded-xl text-center p-[25px]">
            <figure class="bg-[#0D6EFD0D] rounded-xl"><img class=" p-[50px]  " src="${phone.image}"
            alt="phone" /></figure>
            <div class="card-body">
                <h2 class="text-[#403F3F] text-2xl font-bold my-6 ">${phone.
                phone_name}</h2>
                <p class=" text-[#706F6F] text-lg leading-8 mb-2 " >Tech innovation, powerful cameras, sleek designs—diverse mobile models redefine excellence</p>
                <div class="card-actions justify-center">
                    <button class=" primary-btn py-3 text-xl font-semibold ">Show Details</button>
                </div>
            </div>
        </div>        
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

//handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText);
    loadPhone(inputText, isShowAll);

}
// loading function-------------------------
const toggleLoadingSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone();