/* eslint-disable func-style */

$(document).ready(() => {
  const $body = $('body');//
  $body.html('');//clears the body
  $body.css({
    'background-color': '#DBF9FC',
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    //'text-align': 'center',
    //'padding-top': '20px'

  });
  const title = $('<h1>Twiddler X<h1>');
  title.css({
    'color': 'grey',
    'margin-bottom': '20px'
  });
  $body.append(title);
  const $tweetsDiv = $('<div id=tweets>');//conatainer for holding tweet
  $body.append($tweetsDiv);// pushes tweets to the body

  function MakeNewTweets() {
  //create func to show new tweets
    const showTweets = () => {
      const $tweetsToShow = streams.home.map((tweet) => {
        const $tweet = $('<div class="tweet"></div>');
        const text = `<a href="#" class="username" data-user="${tweet.user}">@${tweet.user}</a>: ${tweet.message} (${timestamp(tweet.created_at)})`;
    
        $tweet.html(text);
    
        return $tweet;
      });
      $tweetsDiv.html('');//clear current tweets left
      $tweetsDiv.append($tweetsToShow);//append new tweets
      $tweetsDiv.css({
        'background-color': 'white',
        'padding': '20px',
        'border-radius': '5px',
        'margin-top': '20px'
      });
      //add username buton
      $('.username').on('click', function(event) {
        const user = $(this).data('user');
        userTimeline(user);
      });
    };
    const $tweetsButton = $('<button>Show New Tweets</button>');//create the tweets button
    $body.append($tweetsButton);
    $tweetsButton.on('click', () => {
      showTweets();//calls whole fun to show new tweets
    });
    showTweets(); //first show of tweets
  }
  MakeNewTweets();
  //adds timestamp to tweets
  function timestamp(time) {
    const currTime = new Date();//current time
    const tweetTime = new Date(time);//make tweets time into usable data
    const timeDiff = Math.floor((currTime.getTime() - tweetTime.getTime()) / 1000);//use getTime to subtract the diff then turn into seconds instead of milliseconds so readable to user
    if (timeDiff < 60) {
      if (timeDiff === 1) {
        return '1 second ago';
      } else {
        return timeDiff + ' seconds ago';
      }
    } else if (timeDiff < 3600) {
      const min = Math.floor(timeDiff / 60); //create minutes data
      if ( min === 1) {
        return '1 minute ago';
      } else {
        return min + ' minutes ago';
      }
    } else if (timeDiff < 86400) {
      const hrs = Math.floor(timeDiff / 3600);//create hrs data and go thu same if's
      if (hrs === 1) {
        return '1 hour ago';
      } else {
        return hrs + ' hours ago';
      }
    }
 
    
    
  }
  //shows users
  function userTimeline(username) {
    const userTweetsRec = streams.users[username];
    const $userTweetShown = userTweetsRec.map((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const text = `@${tweet.user}: ${tweet.message} (${timestamp(tweet.created_at)})`;
      $tweet.text(text);
      return $tweet;
    });
    $tweetsDiv.html('');
    $tweetsDiv.append($userTweetShown);




  }
  function userTweet() {
    const $tweetData = $('<input type = "text" placeholder="tweet">');
    const $tweetButton = $('<button>Submit</button>');

    $body.append($tweetData);
    $body.append($tweetButton);
    //tweet button for users tweets
    $tweetButton.on('click', () => {
      const tweetMessage = $tweetData.val().trim();
      if (tweetMessage !== '') {
        const userTweetObj = {
          user: 'currentUser',
          message: tweetMessage,
          created_at: new Date()
        };
        streams.home.push(userTweetObj);
        MakeNewTweets();
        $tweetData.val('');
      }
     
    });
    
  }
  userTweet();
  

  





});
//timestamp();







// const $tweets = streams.home.map((tweet) => {
//   const $tweet = $('<div></div>');
//   const text = `@${tweet.user}: ${tweet.message}`;

//   $tweet.text(text);

//   return $tweet;
// });
  
//$tweetsDiv.append($tweets);
  
//});
