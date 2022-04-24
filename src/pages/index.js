import "./index.css";
import * as consts from '../scripts/utils/constants';
import initDevices from './data/initDevices.json';
import conversionRate from './data/conversionRate.json';
import Select from "../scripts/components/Select";
let lastScrollY = 0;
let currentCurrency = 'gbp';

function convertPrice(priceInGBP, targetCurrency = currentCurrency) {
    return priceInGBP * conversionRate[targetCurrency];
}

function getCurrentCurrencySymbol() {
    return consts.currencies[currentCurrency];
}

const getDiscont = price => (price * .8).toFixed(2);

function updateDevices() {
    consts.devices.innerHTML = '';
    initDevices.forEach(data => {
        const option = document.createElement("option");
        const price = convertPrice(data['price']).toFixed(2)
        option.value = price;
        option.text = `${data['device']} ${data['year']} ${getCurrentCurrencySymbol()}${price}`;
        consts.devices.add(option);
    });
}

function renderPrice(price) {
    let [mainPrice, cents] = price.split('.');
    consts.oldPrice.textContent = getCurrentCurrencySymbol() + mainPrice;
    consts.oldPrice.appendChild(createCentsElement(cents))

    let [mainNewPrice, newCents] = getDiscont(price).split('.');
    consts.newPrice.textContent = getCurrentCurrencySymbol() + mainNewPrice;
    consts.newPrice.appendChild(createCentsElement(newCents))
}

function setPrice() {
    const price = consts.devices.options[devices.selectedIndex].value;
    renderPrice(price);
}

function createCentsElement(cents) {
    let centsElement = document.createElement('span');
    centsElement.className = consts.selectors.cents;
    centsElement.innerText = `.${cents}`;
    return centsElement;
}

function handleChangeCurrency(e) {
    currentCurrency = e.target.value;
    updateDevices();
    setPrice();
    select.update();
}

function handleScroll() {
    if (window.innerWidth > 1440) {
        consts.buyBlock.classList.remove(consts.selectors.buyBlockMini);
        consts.buyBlock.classList.remove(consts.selectors.buyBlockStickBottom);
        consts.buyBlock.classList.add(consts.selectors.buyBlockStickTop);
    } else {
        consts.buyBlock.style.top = '';
        consts.buyBlock.classList.remove(consts.selectors.buyBlockStickTop);
        if (consts.buyBlock.offsetTop < scrollY) {
            consts.buyBlock.classList.add(consts.selectors.buyBlockMini);
            consts.buyBlock.classList.add(consts.selectors.buyBlockStickBottom);
            consts.deviceMini.textContent = " - " + select.getSelected();
        } else {
            consts.buyBlock.classList.remove(consts.selectors.buyBlockMini);
            consts.buyBlock.classList.remove(consts.selectors.buyBlockStickBottom);
        }
    }
    if (lastScrollY > scrollY) {
        consts.header.classList.add(consts.selectors.headerStick);
        if (window.innerWidth > 1440)
            consts.buyBlock.style.top = '104px';
    } else {
        consts.header.classList.remove(consts.selectors.headerStick);
        if (window.innerWidth > 1440)
            consts.buyBlock.style.top = '40px';
    }
    lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
consts.currency.addEventListener('change', handleChangeCurrency);
consts.buyBlock.addEventListener('click', () => consts.buyBlock.classList.remove(consts.selectors.buyBlockMini))

updateDevices();
setPrice();

const select = new Select(() => setPrice());
select.generate();