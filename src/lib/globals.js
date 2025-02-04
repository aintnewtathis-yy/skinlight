export const CMS_URL = 'https://strapi-core.cr.ylean.ru'
/* export const CMS_URL = 'http://localhost:1337'
 */

export let deliveryContent = {
    title: 'Доставка',
    content: `<div class="flex flex-col gap-4">
                            <p>Три способа доставки заказа для розничных клиентов:</p>
                        </div>
                        <div class="flex flex-col gap-3" id="fromoffice">
                            <h3 class="font-serif text-xl">Самовывоз из офиса</h3>
                            <p>
                                Товары можно забрать по адресу
                                <a
                                    href="https://yandex.ru/maps/213/moscow/house/2_ya_frunzenskaya_ulitsa_10/Z04Ycw9iS0EFQFtvfXtzcnRnYg==/?ll=37.582242%2C55.723846&z=16.9"
                                >
                                    г. Москва, 2-я Фрунзенская 10/1
                                </a>
                            </p>
                        </div>
                        <div class="flex flex-col gap-3" id="courier">
                            <h3 class="font-serif text-xl">Курьерская доставка</h3>
                            <p>
                                Доставка собственной курьерской службой по г. Москва (в пределах МКАД) "до двери"-
                                400 рублей, при заказе от 3 000 рублей - бесплатно. Оплата наличными.
                            </p>
                        </div>
                        <div class="flex flex-col gap-3" id="cdek">
                            <h3 class="font-serif text-xl">Пункты выдачи СДЭК</h3>
                            <p>
                                Доставка по г. Москва и России осуществляется
                                <a href="https://www.cdek.ru/">транспортной компанией СДЭК до пункта ПВЗ</a> (ПВЗ согласовывается
                                при оформлении заказа).
                            </p>
                        </div>
                        <div class="flex flex-col gap-3">
                            <h3 class="font-serif text-xl">Доставка для оптовых клиентов</h3>
                            <p>
                                Условия оплаты и доставки уточняйте у вашего менеджера
                                <a href="tel:+74956091010"> +7 (495) 609-10-10 </a>.
                            </p>
                        </div>
`
};
export let profiContent = {
    title: 'Мастерам и косметологам',
    content: `<p><a href="/register">Зарегестрируйтесь</a> и подтвердите статус мастера в профиле, чтобы получить доступ к специальным ценам на продукцию</p>
    
`
};