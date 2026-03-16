actor {
  type Episode = {
    title : Text;
    description : Text;
  };

  type Webseries = {
    title : Text;
    tagline : Text;
    episodes : [Episode];
  };

  let webseries = {
    title = "हमारी कहानी";
    tagline = "रिश्तों का संगम";
    episodes = [
      {
        title = "प्यार का पहला कदम";
        description = "आकांश और राम की पहली मुलाकात।";
      },
      {
        title = "परिवार का संघर्ष";
        description = "रिश्तों में आई गलतफहमी और उनका समाधान।";
      },
      {
        title = "नया सवेरा";
        description = "समझदारी और विश्वास से रिश्तों में आई मजबूती।";
      },
    ];
  };

  public query ({ caller }) func getWebseries() : async Webseries {
    webseries;
  };

  public query ({ caller }) func getEpisodes() : async [Episode] {
    webseries.episodes;
  };
};
