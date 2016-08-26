var appExample1 = angular.module('appExample1', ['official.addthis']);

appExample1.config(function($addthisProvider) {
    $addthisProvider.profileId("ra-57b71bceb3ebb9df");
});

appExample1.controller('AddAnotherIpsumCtrl', ['$scope', function($scope) {
    $scope.allIpsums = [
        {
            'name': 'Bacon Ipsum',
            'source': 'http://baconipsum.com/',
            'text': 'Bacon ipsum dolor amet spare ribs short loin tri-tip tenderloin hamburger leberkas andouille picanha ground round landjaeger sirloin t-bone bresaola alcatra cow. Rump chuck sirloin kevin, drumstick turducken kielbasa tail cow. Jerky ribeye drumstick kielbasa pork chop tri-tip pork belly meatloaf andouille pork loin shoulder biltong hamburger cupim prosciutto. Venison pastrami chuck, t-bone rump kielbasa jerky sausage tenderloin spare ribs cow shoulder biltong. Biltong beef pig shoulder pork loin pancetta. Doner pork belly alcatra boudin tongue tri-tip ground round, frankfurter andouille kielbasa cow swine ball tip ham ham hock.'
        },
        {
            'name': 'Cat Ipsum',
            'source': 'http://www.catipsum.com/',
            'text': 'Stand in front of the computer screen. Missing until dinner time cats making all the muffins use lap as chair jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed. Rub face on owner hopped up on catnip chase after silly colored fish toys around the house. Pooping rainbow while flying in a toasted bread costume in space have secret plans intrigued by the shower, and stare at ceiling light but leave hair everywhere, and hiss at vacuum cleaner climb leg. Refuse to leave cardboard box lick the plastic bag and love to play with owner\'s hair tie. Find empty spot in cupboard and sleep all day leave hair everywhere jump around on couch, meow constantly until given food, . Chase imaginary bugs plan steps for world domination lick butt, but sit by the fire. Eat owner\'s food flop over have secret plans sit on the laptop hunt anything that moves. Claws in your leg use lap as chair meowing non stop for food hunt by meowing loudly at 5am next to human slave food dispenser meow or need to chase tail, drink water out of the faucet. Chase red laser dot drink water out of the faucet, find empty spot in cupboard and sleep all day for if it smells like fish eat as much as you wish and paw at beetle and eat it before it gets away leave hair everywhere, and lie on your belly and purr when you are asleep. Claw drapes knock dish off table head butt cant eat out of my own dish yet stretch. Why must they do that paw at beetle and eat it before it gets away, so poop in litter box, scratch the walls so chew foot. Under the bed. Lick butt. Chew foot scream at teh bath poop on grasses. Brown cats with pink ears burrow under covers, or lay on arms while you\'re using the keyboard. Love to play with owner\'s hair tie sniff other cat\'s butt and hang jaw half open thereafter play riveting piece on synthesizer keyboard scream at teh bath and stare at ceiling hiss at vacuum cleaner.'
        },
        {
            'name': 'Cupcake Ipsum',
            'source': 'http://www.cupcakeipsum.com/',
            'text': 'Chocolate bar lollipop cake macaroon gingerbread toffee. Sweet muffin bear claw sesame snaps bear claw. Marshmallow sweet carrot cake cupcake marzipan ice cream chocolate cake dragée croissant. Cookie cotton candy oat cake chocolate brownie apple pie ice cream ice cream. Bonbon candy apple pie cake sugar plum cotton candy. Bonbon cupcake lemon drops croissant jelly. Apple pie toffee fruitcake chocolate cake apple pie. Sweet roll soufflé chocolate bar brownie cotton candy biscuit candy canes cake wafer. Icing soufflé jelly candy canes lollipop pie halvah bonbon croissant. Dessert gingerbread marzipan cake. Candy canes lollipop pastry chocolate cake caramels. Pudding pastry sugar plum ice cream dragée biscuit chocolate bar. Jelly-o sweet apple pie wafer tiramisu.'
        },
        {
            'name': 'Veggie Ipsum',
            'source': 'http://veggieipsum.com/',
            'text': 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.'
        },
        {
            'name': 'Cheese Ipsum',
            'source': 'http://www.cheeseipsum.co.uk/',
            'text': 'Brie mozzarella everyone loves. Edam cheese slices roquefort cauliflower cheese cut the cheese stilton cheese slices fromage. Cheese on toast queso stinking bishop babybel croque monsieur cauliflower cheese brie cheesy grin. Macaroni cheese airedale cheese on toast dolcelatte squirty cheese monterey jack cheddar pepper jack. Boursin squirty cheese ricotta brie bocconcini cut the cheese cheesy grin goat. Blue castello lancashire babybel danish fontina airedale smelly cheese hard cheese halloumi. Who moved my cheese cheddar ricotta taleggio jarlsberg dolcelatte babybel the big cheese. Cheese on toast melted cheese fromage frais jarlsberg camembert de normandie cheese strings edam cow. Everyone loves fromage frais halloumi cheese and biscuits cheese strings taleggio cheese on toast the big cheese. Danish fontina cottage cheese macaroni cheese fromage frais cheese and wine roquefort red leicester.'
        },
        {
            'name': 'Hipster Ipsum',
            'source': 'http://hipsum.co/',
            'text': 'Ennui meditation portland, thundercats microdosing lumbersexual gastropub seitan single-origin coffee umami viral. Slow-carb hoodie fashion axe freegan church-key. Retro poutine yr normcore readymade tilde. Food truck affogato vegan, literally church-key brunch cronut hashtag celiac trust fund single-origin coffee. Ugh retro lumbersexual VHS, franzen small batch hashtag drinking vinegar farm-to-table. Leggings church-key cardigan normcore four dollar toast. Hella microdosing truffaut, quinoa kombucha ethical dreamcatcher you probably haven\'t heard of them messenger bag venmo kickstarter.'
        },
        {
            'name': 'Pirate Ipsum',
            'source': 'http://pirateipsum.me/',
            'text': 'Tackle jib American Main Nelsons folly splice the main brace gaff tender Barbary Coast weigh anchor hail-shot. Doubloon code of conduct Chain Shot run a rig yawl hulk starboard driver black jack to go on account. Pink keel driver mutiny black jack boatswain dead men tell no tales cog rigging grog.'
        },
        {
            'name': 'Corporate Ipsum',
            'source': 'http://www.cipsum.com/',
            'text': 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.'
        },
        {
            'name': 'Office Ipsum',
            'source': 'http://officeipsum.com/',
            'text': 'Drink from the firehose value prop and viral engagement can we align on lunch orders, so pro-sumer software shotgun approach, and three-martini lunch. Show pony nail jelly to the hothouse wall horsehead offer. Quick win. Baseline the procedure and samepage your department shoot me an email. That jerk from finance really threw me under the bus quick-win where do we stand on the latest client ask. Granularity that jerk from finance really threw me under the bus knowledge process outsourcing pushback, and cross sabers obviously. Quick win punter nor put your feelers out, but good optics. New economy prairie dogging, or due diligence, for take five, punch the tree, and come back in here with a clear head. Organic growth we need more paper innovation is hot right now yet good optics yet what do you feel you would bring to the table if you were hired for this position driving the initiative forward and prairie dogging. Thinking outside the box not enough bandwidth we just need to put these last issues to bed productize market-facing. Pro-sumer software. Low-hanging fruit. Q1 time to open the kimono loop back, but player-coach, so hit the ground running. Diversify kpis meeting assassin. One-sheet hard stop. '
        }
    ];
    $scope.shownIpsums = [];
    var iterator = 0;

    $scope.addAnother = function () {
        $scope.shownIpsums.push($scope.allIpsums[iterator]);
        iterator++;
        if (iterator === $scope.allIpsums.length) {
            iterator = 0;
        }
    };
    $scope.addAnother();
}]);
