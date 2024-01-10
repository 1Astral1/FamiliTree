export const tree = {
    Individuals: [
        {
            Id: '@I1@',
            Surname: 'Кокоева',
            Givenname: 'Диана Климентовна',
            Fullname: 'Диана Климентовна / (Кокоева)/',
            Sex: 'F',
            Relations: '@F1@'
        },
        {
            Id: '@I2@',
            Surname: 'Тотрова',
            Givenname: 'Залина Владимировна',
            Fullname: 'Залина Владимировна / (Тотрова)/',
            Sex: 'F',
            Birth: {
                Date: {
                    Original: '1989',
                    Between: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1988-12-31T21:00:00.000Z'
                    },
                    And: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1989-12-31T21:00:00.000Z'
                    }
                }
            },
            Relations: ['@F2@', '@F3@']
        },
        {
            Id: '@I3@',
            Surname: 'Тотрова',
            Givenname: 'Мадина Владимировна',
            Fullname: 'Мадина Владимировна / (Тотрова)/',
            Sex: 'F',
            Birth: {
                Date: {
                    Original: '1987',
                    Between: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1986-12-31T21:00:00.000Z'
                    },
                    And: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1987-12-31T21:00:00.000Z'
                    }
                }
            },
            Relations: ['@F2@', '@F4@']
        },
        {
            Id: '@I4@',
            Surname: 'Тотрова',
            Givenname: 'Тома Владиславовна',
            Fullname: 'Тома Владиславовна / (Тотрова)/',
            Sex: 'F',
            Relations: '@F5@'
        },
        {
            Id: '@I5@',
            Surname: 'Цопанова',
            Givenname: ',',
            Fullname: ', / (Цопанова)/',
            Sex: 'F',
            Death: 'Y',
            Relations: '@F6@'
        },
        {
            Id: '@I6@',
            Givenname: 'Хетаг Радионович',
            Fullname: 'Хетаг Радионович /Аркаев/',
            Sex: 'M',
            Relations: '@F4@'
        },
        {
            Id: '@I7@',
            Givenname: 'Сослан Артурович',
            Fullname: 'Сослан Артурович /Болиев/',
            Sex: 'M',
            Relations: '@F3@'
        },
        {
            Id: '@I8@',
            Givenname: 'Вячеслав Сергеевич',
            Fullname: 'Вячеслав Сергеевич /Гиоев/',
            Sex: 'M',
            Relations: '@F7@'
        },
        {
            Id: '@I9@',
            Surname: 'Тотрова',
            Givenname: 'Лариса Бечирбековна',
            Fullname: 'Лариса Бечирбековна /Гиоева (Тотрова)/',
            Sex: 'F',
            Relations: ['@F8@', '@F7@']
        },
        {
            Id: '@I10@',
            Givenname: 'Ладимхан Бекузаевна',
            Fullname: 'Ладимхан Бекузаевна /Колиева/',
            Sex: 'F',
            Relations: '@F8@'
        },
        {
            Id: '@I11@',
            Givenname: 'Бечирбек Дампеевич',
            Fullname: 'Бечирбек Дампеевич /Тотров/',
            Sex: 'M',
            Relations: ['@F9@', '@F8@']
        },
        {
            Id: '@I12@',
            Givenname: 'Владимир Бечирбекович',
            Fullname: 'Владимир Бечирбекович /Тотров/',
            Sex: 'M',
            Relations: ['@F8@', '@F2@']
        },
        {
            Id: '@I13@',
            Givenname: 'Владислав Бечирбекович',
            Fullname: 'Владислав Бечирбекович /Тотров/',
            Sex: 'M',
            Relations: ['@F8@', '@F5@']
        },
        {
            Id: '@I14@',
            Givenname: 'Дампе Владимирович',
            Fullname: 'Дампе Владимирович /Тотров/',
            Sex: 'M',
            Birth: {
                Date: {
                    Original: '1993',
                    Between: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1992-12-31T21:00:00.000Z'
                    },
                    And: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1993-12-31T21:00:00.000Z'
                    }
                }
            },
            Relations: ['@F2@', '@F1@']
        },
        {
            Id: '@I15@',
            Givenname: 'Дампе Хусинаевич',
            Fullname: 'Дампе Хусинаевич /Тотров/',
            Sex: 'M',
            Birth: {
                Date: {
                    Original: '1903',
                    Between: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1902-12-31T21:29:43.000Z'
                    },
                    And: {
                        HasYear: true,
                        HasMonth: true,
                        HasDay: true,
                        Value: '1903-12-31T21:29:43.000Z'
                    }
                }
            },
            Relations: ['@F10@', '@F9@'],
            Death: 'Y'
        },
        {
            Id: '@I16@',
            Givenname: 'Джетагаз Соломонович',
            Fullname: 'Джетагаз Соломонович /Тотров/',
            Sex: 'M',
            Relations: '@F11@',
            Death: 'Y'
        },
        {
            Id: '@I17@',
            Givenname: 'Карго Хусинаевич',
            Fullname: 'Карго Хусинаевич /Тотров/',
            Sex: 'M',
            Relations: '@F10@',
            Death: 'Y'
        },
        {
            Id: '@I18@',
            Givenname: 'Касполат Соломонович',
            Fullname: 'Касполат Соломонович /Тотров/',
            Sex: 'M',
            Relations: '@F11@'
        },
        {
            Id: '@I19@',
            Givenname: 'Нагко Хусинаевич',
            Fullname: 'Нагко Хусинаевич /Тотров/',
            Sex: 'M',
            Relations: '@F10@',
            Death: 'Y'
        },
        {
            Id: '@I20@',
            Givenname: 'Соломон',
            Fullname: 'Соломон /Тотров/',
            Sex: 'M',
            Death: 'Y',
            Relations: '@F11@'
        },
        {
            Id: '@I21@',
            Givenname: 'Татаркан Хаматканович',
            Fullname: 'Татаркан Хаматканович /Тотров/',
            Sex: 'M',
            Relations: '@F6@',
            Death: 'Y'
        },
        {
            Id: '@I22@',
            Givenname: 'Тимофей Хаматканович',
            Fullname: 'Тимофей Хаматканович /Тотров/',
            Sex: 'M',
            Relations: '@F6@',
            Death: 'Y'
        },
        {
            Id: '@I23@',
            Givenname: 'Хаматкан Хусинаевич',
            Fullname: 'Хаматкан Хусинаевич /Тотров/',
            Sex: 'M',
            Relations: ['@F10@', '@F6@'],
            Death: 'Y'
        },
        {
            Id: '@I24@',
            Givenname: 'Хангери Хусинаевич',
            Fullname: 'Хангери Хусинаевич /Тотров/',
            Sex: 'M',
            Relations: '@F10@',
            Death: 'Y'
        },
        {
            Id: '@I25@',
            Givenname: 'Хусина Соломонович',
            Fullname: 'Хусина Соломонович /Тотров/',
            Sex: 'M',
            Relations: ['@F11@', '@F10@'],
            Death: 'Y'
        },
        {
            Id: '@I26@',
            Givenname: 'Рита Николаевна',
            Fullname: 'Рита Николаевна /Тотрова/',
            Sex: 'F',
            Death: 'Y',
            Relations: '@F5@'
        }
    ],
    Relations: [
        {
            Id: '@F1@',
            Husband: '@I14@',
            Wife: '@I1@',
            Marriage: 'Y'
        },
        {
            Id: '@F2@',
            Husband: '@I12@',
            Children: ['@I3@', '@I2@', '@I14@']
        },
        {
            Id: '@F3@',
            Husband: '@I7@',
            Wife: '@I2@',
            Marriage: 'Y'
        },
        {
            Id: '@F4@',
            Husband: '@I6@',
            Wife: '@I3@',
            Marriage: 'Y'
        },
        {
            Id: '@F5@',
            Husband: '@I13@',
            Wife: '@I26@',
            Children: '@I4@',
            Marriage: 'Y'
        },
        {
            Id: '@F6@',
            Husband: '@I23@',
            Wife: '@I5@',
            Children: ['@I21@', '@I22@'],
            Marriage: 'Y'
        },
        {
            Id: '@F7@',
            Husband: '@I8@',
            Wife: '@I9@',
            Marriage: 'Y'
        },
        {
            Id: '@F8@',
            Husband: '@I11@',
            Wife: '@I10@',
            Children: ['@I12@', '@I9@', '@I13@'],
            Marriage: 'Y'
        },
        {
            Id: '@F9@',
            Husband: '@I15@',
            Children: '@I11@'
        },
        {
            Id: '@F10@',
            Husband: '@I25@',
            Children: ['@I15@', '@I17@', '@I24@', '@I23@', '@I19@']
        },
        {
            Id: '@F11@',
            Husband: '@I20@',
            Children: ['@I25@', '@I18@', '@I16@']
        }
    ]
};
