document.addEventListener('DOMContentLoaded', function () {
  chrome.browserAction.setIcon({path:"logo.png"});
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  document.getElementById("text").innerHTML = rand;
  setTimeout(functionToCall,8000);
  function functionToCall() {
  	chrome.browserAction.setIcon({path:"logo_charcoal.png"});
  	//self.close();
  }
});

chrome.runtime.onConnect.addListener(function(portita) {
	console.assert(portita.name == "BAMGChannel");
	portita.onMessage.addListener(function(msg) {
		document.getElementById("output").innerHTML = msg.command;
	});
});

var myArray = ["Thy bidding, master!", "Winter is coming. Speak your wish and stay warm.", "When you play a game of thrones you win or you die. Now speak your mind and let me be.", "Most men would rather deny a hard truth than face it. What would you make of me ?", "Death is so terribly final, while life is full of possibilities. What do you long for ?", "Nothing burns like the cold. I'm freezing here, so speak out !", "Every flight begins with a fall. So fly your wish and let me fall.", "What do we say to the Lord of Death?", "Summer will end soon enough, so tell me what you want.", "A lord must learn that sometimes words can accomplish what swords cannot. So what are your words ?", "A Lannister always pays his debts. How shall I pay mine ?", "A true man does what he will, not what he must. What is your will ?", "The Bear and the Maiden Fair, oh the Bear the Bear. Tell me your wish and I shall be the Maiden Fair.", "Swift as a deer. Quiet as a shadow. I'll do what you will.", "You are in charge, perhaps that is why the Starks have so little humor.", "We all need to be mocked from time to time Lord Mormont lest we start to take ourselves too seriously. So mock me with thy wish.", "I am surrounded by flatterers and fools, but, please, voice your wish and I shall obey.", "You wear your honor like a suit of armor and I am but your servant and follow my master everywhere.", "A man who won't listen can't hear. I am no man, but boy I listen ...", "In this world, only winter is certain. And your will. So voice it.", "Everything's better with some wine in the belly and my listening to thy follies.", " I am the sword in the darkness. I am the watcher on the walls. I listen to you and make it happen.", "Shagga son of Dolf will obey. Shagga will then chop off your manhood.", "I'd have an easier time teaching a wolf to juggle than you will training this aurochs, then obeying your orders.", "Fire cannot kill a dragon, but your wish might give me headaches.", "Spikes. Heads. Walls. What will it be ?", "When the snows fall and the white winds blow, the lone wolf dies but the pack survives. I can be your pack."];
