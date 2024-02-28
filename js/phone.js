const loadPhone = async (searchText = '13', isShowAll) => {
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
    // console.log('is show all', isShowAll)
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
                    <button onclick="handleShowDetail('${phone.slug}')" class=" primary-btn py-3 text-xl font-semibold ">Show Details</button>
                </div>
            </div>
        </div>        
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
    // console.log('clicked handle', id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <div>
            <div class="flex flex-col items-center bg-[#0D6EFD0D] py-12 px-48 mb-10">
                <img class="max-w-[672px]" src="${phone.image}" alt="">
            </div>
            <div>
                <h2 class="text-[#403F3F] text-3xl font-bold mb-6">${phone.name}</h2>
                <p class="text-[#706F6F] leading-7 max-w-[670px] mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">Storage : </span> ${phone?.mainFeatures?.storage}</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">Display Size : </span> ${phone?.mainFeatures?.displaySize}</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">Chipset : </span> ${phone?.mainFeatures?.chipSet}</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">Slug : </span> ${phone?.slug}</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">Release data : </span> ${phone?.releaseDate}</p>
                <p class="text-[#706F6F]  mb-4"><span class="text-[#403F3F] text-xl font-semibold">GPS : </span> ${phone?.others?.GPS}</p>
            </div>
        </div>
    `

    show_detail_modal.showModal()
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

loadPhone();