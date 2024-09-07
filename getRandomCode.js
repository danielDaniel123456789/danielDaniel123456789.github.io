function getRandomCode() {

    const numbersArray = [
        '123map', '678tr', '543vk', '643jk6', '743lk7', 
        '843ak8', '943sk3', '1043wk2', '1143fk', '1243zx8',
        '2345lm1', '3456no2', '4567pq3', '5678rs4', '6789tu5',
        '7890uv6', '8901wx7', '9012yz8', '0123ab9', '1234cd0',
        '2345ef1', '3456gh2', '4567ij3', '5678kl4', '6789mn5',
        '7890op6', '8901qr7', '9012st8', '0123uv9', '1234wx0',
        '2345yz1', '3456ab2', '4567cd3', '5678ef4', '6789gh5',
        '7890ij6', '8901kl7', '9012mn8', '0123op9', '1234qr0'
    ];
    const randomIndex = Math.floor(Math.random() * numbersArray.length);
    return numbersArray[randomIndex];
}
