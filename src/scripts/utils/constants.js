export const currencies = {
    gbp: '£',
    eur: '€',
    usd: '$'
}
export const selectors = {
    buyBlockStickTop: 'buy-block_stickTop',
    buyBlockMini: 'buy-block_mini',
    buyBlockStickBottom: 'buy-block_stickBottom',
    headerStick: 'header_stick',
    cents: 'product-card__cents',
    devices: 'product-card__devices',
    selectedDevices: 'product-card__selected-device',
    device: 'product-card__device',
    selectedDevice: 'product-card__device_selected',
    devicesContainer: 'product-card__container-devices',
    innerDevicesContainer: 'product-card__inner-container-devices',
    optionsContainer: 'product-card__container-options',
    optionsContainerHidden: 'product-card__container-options_hidden',
}
export const header = document.querySelector('.header');
export const buyBlock = document.querySelector('.buy-block');
export const currency = document.querySelector('.currency');
export const oldPrice = document.querySelector('.product-card__old-price');
export const newPrice = document.querySelector('.product-card__new-price');
export const devices = document.querySelector(`.${selectors.devices}`);
export const devicesContainer = document.querySelector(`.${selectors.devicesContainer}`);
export const innerDevicesContainer = document.querySelector(`.${selectors.innerDevicesContainer}`);