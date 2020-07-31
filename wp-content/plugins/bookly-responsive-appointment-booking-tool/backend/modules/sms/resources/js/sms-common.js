jQuery(function($) {
    'use strict';

    /**
     * Select country
     *
     * @param opts
     * @returns {*}
     */
    $.fn.booklySelectCountry = function (opts) {
        const formatCountry = function (item) {
            return $('<span class="intl-tel-input"><div class="d-inline-block mr-2 iti-flag ' + item.id + '"></div>' + item.text + '</span>');
        };
        opts = $.extend({
            width: '100%',
            theme: 'bootstrap4',
            dropdownParent: '#bookly-tbs',
            language: {
                noResults: function() { return BooklyL10n.noResults; }
            },
            templateResult: formatCountry,
            templateSelection: formatCountry,
            data: [{id:"af",text:"Afghanistan (‫افغانستان‬‎)"},{id:"al",text:"Albania (Shqipëri)"},{id:"dz",text:"Algeria (‫الجزائر‬‎)"},{id:"as",text:"American Samoa"},{id:"ad",text:"Andorra"},{id:"ao",text:"Angola"},{id:"ai",text:"Anguilla"},{id:"ag",text:"Antigua and Barbuda"},{id:"ar",text:"Argentina"},{id:"am",text:"Armenia (Հայաստան)"},{id:"aw",text:"Aruba"},{id:"au",text:"Australia"},{id:"at",text:"Austria (Österreich)"},{id:"az",text:"Azerbaijan (Azərbaycan)"},{id:"bs",text:"Bahamas"},{id:"bh",text:"Bahrain (‫البحرين‬‎)"},{id:"bd",text:"Bangladesh (বাংলাদেশ)"},{id:"bb",text:"Barbados"},{id:"by",text:"Belarus (Беларусь)"},{id:"be",text:"Belgium (België)"},{id:"bz",text:"Belize"},{id:"bj",text:"Benin (Bénin)"},{id:"bm",text:"Bermuda"},{id:"bt",text:"Bhutan (འབྲུག)"},{id:"bo",text:"Bolivia"},{id:"ba",text:"Bosnia and Herzegovina (Босна и Херцеговина)"},{id:"bw",text:"Botswana"},{id:"br",text:"Brazil (Brasil)"},{id:"io",text:"British Indian Ocean Territory"},{id:"vg",text:"British Virgin Islands"},{id:"bn",text:"Brunei"},{id:"bg",text:"Bulgaria (България)"},{id:"bf",text:"Burkina Faso"},{id:"bi",text:"Burundi (Uburundi)"},{id:"kh",text:"Cambodia (កម្ពុជា)"},{id:"cm",text:"Cameroon (Cameroun)"},{id:"ca",text:"Canada"},{id:"cv",text:"Cape Verde (Kabu Verdi)"},{id:"bq",text:"Caribbean Netherlands"},{id:"ky",text:"Cayman Islands"},{id:"cf",text:"Central African Republic (République centrafricaine)"},{id:"td",text:"Chad (Tchad)"},{id:"cl",text:"Chile"},{id:"cn",text:"China (中国)"},{id:"cx",text:"Christmas Island"},{id:"cc",text:"Cocos (Keeling) Islands"},{id:"co",text:"Colombia"},{id:"km",text:"Comoros (‫جزر القمر‬‎)"},{id:"cd",text:"Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)"},{id:"cg",text:"Congo (Republic) (Congo-Brazzaville)"},{id:"ck",text:"Cook Islands"},{id:"cr",text:"Costa Rica"},{id:"ci",text:"Côte d’Ivoire"},{id:"hr",text:"Croatia (Hrvatska)"},{id:"cu",text:"Cuba"},{id:"cw",text:"Curaçao"},{id:"cy",text:"Cyprus (Κύπρος)"},{id:"cz",text:"Czech Republic (Česká republika)"},{id:"dk",text:"Denmark (Danmark)"},{id:"dj",text:"Djibouti"},{id:"dm",text:"Dominica"},{id:"do",text:"Dominican Republic (República Dominicana)"},{id:"ec",text:"Ecuador"},{id:"eg",text:"Egypt (‫مصر‬‎)"},{id:"sv",text:"El Salvador"},{id:"gq",text:"Equatorial Guinea (Guinea Ecuatorial)"},{id:"er",text:"Eritrea"},{id:"ee",text:"Estonia (Eesti)"},{id:"et",text:"Ethiopia"},{id:"fk",text:"Falkland Islands (Islas Malvinas)"},{id:"fo",text:"Faroe Islands (Føroyar)"},{id:"fj",text:"Fiji"},{id:"fi",text:"Finland (Suomi)"},{id:"fr",text:"France"},{id:"gf",text:"French Guiana (Guyane française)"},{id:"pf",text:"French Polynesia (Polynésie française)"},{id:"ga",text:"Gabon"},{id:"gm",text:"Gambia"},{id:"ge",text:"Georgia (საქართველო)"},{id:"de",text:"Germany (Deutschland)"},{id:"gh",text:"Ghana (Gaana)"},{id:"gi",text:"Gibraltar"},{id:"gr",text:"Greece (Ελλάδα)"},{id:"gl",text:"Greenland (Kalaallit Nunaat)"},{id:"gd",text:"Grenada"},{id:"gp",text:"Guadeloupe"},{id:"gu",text:"Guam"},{id:"gt",text:"Guatemala"},{id:"gg",text:"Guernsey"},{id:"gn",text:"Guinea (Guinée)"},{id:"gw",text:"Guinea-Bissau (Guiné Bissau)"},{id:"gy",text:"Guyana"},{id:"ht",text:"Haiti"},{id:"hn",text:"Honduras"},{id:"hk",text:"Hong Kong (香港)"},{id:"hu",text:"Hungary (Magyarország)"},{id:"is",text:"Iceland (Ísland)"},{id:"in",text:"India (भारत)"},{id:"id",text:"Indonesia"},{id:"ir",text:"Iran (‫ایران‬‎)"},{id:"iq",text:"Iraq (‫العراق‬‎)"},{id:"ie",text:"Ireland"},{id:"im",text:"Isle of Man"},{id:"il",text:"Israel (‫ישראל‬‎)"},{id:"it",text:"Italy (Italia)"},{id:"jm",text:"Jamaica"},{id:"jp",text:"Japan (日本)"},{id:"je",text:"Jersey"},{id:"jo",text:"Jordan (‫الأردن‬‎)"},{id:"kz",text:"Kazakhstan (Казахстан)"},{id:"ke",text:"Kenya"},{id:"ki",text:"Kiribati"},{id:"xk",text:"Kosovo"},{id:"kw",text:"Kuwait (‫الكويت‬‎)"},{id:"kg",text:"Kyrgyzstan (Кыргызстан)"},{id:"la",text:"Laos (ລາວ)"},{id:"lv",text:"Latvia (Latvija)"},{id:"lb",text:"Lebanon (‫لبنان‬‎)"},{id:"ls",text:"Lesotho"},{id:"lr",text:"Liberia"},{id:"ly",text:"Libya (‫ليبيا‬‎)"},{id:"li",text:"Liechtenstein"},{id:"lt",text:"Lithuania (Lietuva)"},{id:"lu",text:"Luxembourg"},{id:"mo",text:"Macau (澳門)"},{id:"mk",text:"Macedonia (FYROM) (Македонија)"},{id:"mg",text:"Madagascar (Madagasikara)"},{id:"mw",text:"Malawi"},{id:"my",text:"Malaysia"},{id:"mv",text:"Maldives"},{id:"ml",text:"Mali"},{id:"mt",text:"Malta"},{id:"mh",text:"Marshall Islands"},{id:"mq",text:"Martinique"},{id:"mr",text:"Mauritania (‫موريتانيا‬‎)"},{id:"mu",text:"Mauritius (Moris)"},{id:"yt",text:"Mayotte"},{id:"mx",text:"Mexico (México)"},{id:"fm",text:"Micronesia"},{id:"md",text:"Moldova (Republica Moldova)"},{id:"mc",text:"Monaco"},{id:"mn",text:"Mongolia (Монгол)"},{id:"me",text:"Montenegro (Crna Gora)"},{id:"ms",text:"Montserrat"},{id:"ma",text:"Morocco (‫المغرب‬‎)"},{id:"mz",text:"Mozambique (Moçambique)"},{id:"mm",text:"Myanmar (Burma) (မြန်မာ)"},{id:"na",text:"Namibia (Namibië)"},{id:"nr",text:"Nauru"},{id:"np",text:"Nepal (नेपाल)"},{id:"nl",text:"Netherlands (Nederland)"},{id:"nc",text:"New Caledonia (Nouvelle-Calédonie)"},{id:"nz",text:"New Zealand"},{id:"ni",text:"Nicaragua"},{id:"ne",text:"Niger (Nijar)"},{id:"ng",text:"Nigeria"},{id:"nu",text:"Niue"},{id:"nf",text:"Norfolk Island"},{id:"kp",text:"North Korea (조선 민주주의 인민 공화국)"},{id:"mp",text:"Northern Mariana Islands"},{id:"no",text:"Norway (Norge)"},{id:"om",text:"Oman (‫عُمان‬‎)"},{id:"pk",text:"Pakistan (‫پاکستان‬‎)"},{id:"pw",text:"Palau"},{id:"ps",text:"Palestine (‫فلسطين‬‎)"},{id:"pa",text:"Panama (Panamá)"},{id:"pg",text:"Papua New Guinea"},{id:"py",text:"Paraguay"},{id:"pe",text:"Peru (Perú)"},{id:"ph",text:"Philippines"},{id:"pl",text:"Poland (Polska)"},{id:"pt",text:"Portugal"},{id:"pr",text:"Puerto Rico"},{id:"qa",text:"Qatar (‫قطر‬‎)"},{id:"re",text:"Réunion (La Réunion)"},{id:"ro",text:"Romania (România)"},{id:"ru",text:"Russia (Россия)"},{id:"rw",text:"Rwanda"},{id:"bl",text:"Saint Barthélemy"},{id:"sh",text:"Saint Helena"},{id:"kn",text:"Saint Kitts and Nevis"},{id:"lc",text:"Saint Lucia"},{id:"mf",text:"Saint Martin (Saint-Martin (partie française))"},{id:"pm",text:"Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)"},{id:"vc",text:"Saint Vincent and the Grenadines"},{id:"ws",text:"Samoa"},{id:"sm",text:"San Marino"},{id:"st",text:"São Tomé and Príncipe (São Tomé e Príncipe)"},{id:"sa",text:"Saudi Arabia (‫المملكة العربية السعودية‬‎)"},{id:"sn",text:"Senegal (Sénégal)"},{id:"rs",text:"Serbia (Србија)"},{id:"sc",text:"Seychelles"},{id:"sl",text:"Sierra Leone"},{id:"sg",text:"Singapore"},{id:"sx",text:"Sint Maarten"},{id:"sk",text:"Slovakia (Slovensko)"},{id:"si",text:"Slovenia (Slovenija)"},{id:"sb",text:"Solomon Islands"},{id:"so",text:"Somalia (Soomaaliya)"},{id:"za",text:"South Africa"},{id:"kr",text:"South Korea (대한민국)"},{id:"ss",text:"South Sudan (‫جنوب السودان‬‎)"},{id:"es",text:"Spain (España)"},{id:"lk",text:"Sri Lanka (ශ්‍රී ලංකාව)"},{id:"sd",text:"Sudan (‫السودان‬‎)"},{id:"sr",text:"Suriname"},{id:"sj",text:"Svalbard and Jan Mayen"},{id:"sz",text:"Swaziland"},{id:"se",text:"Sweden (Sverige)"},{id:"ch",text:"Switzerland (Schweiz)"},{id:"sy",text:"Syria (‫سوريا‬‎)"},{id:"tw",text:"Taiwan (台灣)"},{id:"tj",text:"Tajikistan"},{id:"tz",text:"Tanzania"},{id:"th",text:"Thailand (ไทย)"},{id:"tl",text:"Timor-Leste"},{id:"tg",text:"Togo"},{id:"tk",text:"Tokelau"},{id:"to",text:"Tonga"},{id:"tt",text:"Trinidad and Tobago"},{id:"tn",text:"Tunisia (‫تونس‬‎)"},{id:"tr",text:"Turkey (Türkiye)"},{id:"tm",text:"Turkmenistan"},{id:"tc",text:"Turks and Caicos Islands"},{id:"tv",text:"Tuvalu"},{id:"vi",text:"U.S. Virgin Islands"},{id:"ug",text:"Uganda"},{id:"ua",text:"Ukraine (Україна)"},{id:"ae",text:"United Arab Emirates (‫الإمارات العربية المتحدة‬‎)"},{id:"gb",text:"United Kingdom"},{id:"us",text:"United States"},{id:"uy",text:"Uruguay"},{id:"uz",text:"Uzbekistan (Oʻzbekiston)"},{id:"vu",text:"Vanuatu"},{id:"va",text:"Vatican City (Città del Vaticano)"},{id:"ve",text:"Venezuela"},{id:"vn",text:"Vietnam (Việt Nam)"},{id:"wf",text:"Wallis and Futuna (Wallis-et-Futuna)"},{id:"eh",text:"Western Sahara (‫الصحراء الغربية‬‎)"},{id:"ye",text:"Yemen (‫اليمن‬‎)"},{id:"zm",text:"Zambia"},{id:"zw",text:"Zimbabwe"},{id:"ax",text:"Åland Islands"}]
        }, opts);

        return this.select2(opts);
    };

    /**
     * Prices list
     *
     * @param opts
     */
    $.fn.booklySmsPrices = function (opts) {
        let columns = [];

        $.each(BooklyL10n.datatables.sms_prices.settings.columns, function (column, show) {
            if (show) {
                switch (column) {
                    case 'country_iso_code':
                        columns.push({
                            data: column,
                            className: 'align-middle',
                            render: function ( data, type, row, meta ) {
                                return '<div class="iti-flag ' + data + '"></div>';
                            }
                        });
                        break;
                    case 'price':
                        columns.push({
                            data: column,
                            className: "text-right",
                            render: function ( data, type, row, meta ) {
                                return '$' + data.replace(/0+$/, '');
                            }
                        });
                        break;
                    case 'price_alt':
                        columns.push({
                            data: column,
                            className: "text-right",
                            render: function ( data, type, row, meta ) {
                                if (row.price_alt === '') {
                                    return '-';
                                } else {
                                    return '$' + data.replace(/0+$/, '');
                                }
                            }
                        });
                        break;
                    default:
                        columns.push({data: column});
                        break;
                }
            }
        });
        if (columns.length) {
            this.DataTable({
                ordering: false,
                paging: false,
                info: false,
                searching: false,
                processing: true,
                responsive: true,
                ajax: {
                    url: ajaxurl,
                    data: {action: 'bookly_get_price_list', csrf_token: BooklyL10n.csrfToken},
                    dataSrc: 'list'
                },
                columns: columns,
                language: {
                    zeroRecords: BooklyL10n.noResults,
                    processing: BooklyL10n.processing
                }
            });
        }

        return this;
    };
});