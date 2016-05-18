window.onload = game;


function game() {

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min  + 1)) + min;
}

function getCard() {
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', "A"];
	return cards[getRandomInt(0, cards.length - 1)];
}
function getSum(hand) {
	var sum = 0;
	// сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card != 'A') {
			if (card == 'J' || card == 'Q' || card == 'K') {
				sum = sum +10;
			} else {
				sum = sum + parseInt(card);
			}
		}
	}

	//туз считается, как 1, если текущая сумма больше 10, иначе - 11
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card == 'A') {
			if (sum > 10) {
				sum = sum +1;
			} else {
				sum = sum + 11;
			}
		}
	}

	return sum;
}

function getStatus() {
	return 'Дилер: ' + dealer.join(' ') + '  Игрок: ' + player.join(' ') + '.';
}



//var answer2 = '';



var bank = 1000;


do {	
	var stavka = parseInt(prompt('Ваш банк = ' + bank + '$. Введите ставку:'));
	var dealer = [getCard()];
	var player = [getCard(), getCard()];

	if (getSum(player) == 21) {
	alert('Поздравляю! Black Jack на раздаче! $_$ ');
	bank = bank + stavka * 1.5;
} else {
	var answer = '';
	do {
		answer = prompt(getStatus() + ' Хотите еще карту? 1 - да, иначе - нет');
		// сдаем карту игроку, либо прекращаем игру
		if (answer == '1') {
			player.push(getCard());

			//проверяем, нет ли перебора или выигрыша
			sum = getSum(player);
			if (sum > 21) {
				alert('Перебор :( ' + getStatus());
				bank = bank - stavka;	
				break;
			} else if (sum == 21) {
				alert('Black Jack! Это победа! ' + getStatus());
				bank = bank + stavka;
				break;
			}

		} else {
			//dealer
			while (getSum(dealer) < 17) {
				dealer.push(getCard());
			};

			// проверяем результат
			var sumDealer = getSum(dealer);
			var sumPlayer = getSum(player);
			if (sumDealer == 21) {
				alert('У дилера Black Jack! :( ' + getStatus());
				bank = bank - stavka;	
			} else if (sumDealer > 21) {
				alert('У дилера перебор! :) ' + getStatus());
				bank = bank + stavka;
			} else if (sumPlayer == sumDealer) {
				alert('Ничья ' + getStatus());
			} else if (sumPlayer > sumDealer) {
				alert('Выигрыш! :) ' + getStatus());
				bank = bank + stavka;
			} else {
				alert('Проигрыш :( ' + getStatus());
				bank = bank - stavka;
			}
		}
	} while(answer == '1');

}

} while (prompt('Сыграем еще? 1 - да, другое - нет:') == '1')

if (bank > 1000) {
	bank = bank - 1000;
	alert('Поздравляю! Вы выиграли ' + bank + '$');
}  else  if (bank < 1000) {
	bank = 1000 - bank;
	alert('Повезет в другой раз. Вы потратили ' + bank + '$');
} else {
	alert('Неплохо. Вы остались при своих. 0$ потрачено.')
}
}