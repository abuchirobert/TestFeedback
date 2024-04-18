
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;



contract Feedback {
    
     struct FeedbackItem {
        address sender;
        string feedback;
     }

    FeedbackItem[] public feedbacks;

    event FeedbackAdded(address indexed sender, string feedback);
    
    // To create and add a new Feedback!!
    function addFeedback(string memory _feedback) public {
        feedbacks.push(FeedbackItem({
            sender: msg.sender,
            feedback: _feedback
        }));

        emit FeedbackAdded(msg.sender, _feedback);
    }

    //To get the FeedbackCount
     function getFeedbackCount() public view returns(uint) {
         return feedbacks.length;
     }

  // function created to get the Feedbacks created!.
      function getFeedback(uint _index) public view returns( address, string memory) {
         require(_index < feedbacks.length );
        
         FeedbackItem memory item = feedbacks[_index];

         return (item.sender, item.feedback);

      }

}
