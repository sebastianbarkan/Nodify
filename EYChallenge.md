# Project Info
# Requirement 0: Project Info
Project Name: Nodify

Project Description: Nodify enables Citizen Journalism using web3 technologies.

Team Members:
ahmedzfitnez@gmail.com
amiceli34@gmail.com
kun.guo91@gmail.com
sebastiandbarkan@gmail.com
travcrypto1@gmail.com


# Requirement 1:
Team must attend the EY Workshop: How to implement privacy for public blockchains​

Provide your team name, and a list of team members that attended the EY Workshop.​
Team Name: Nodify
Team Members at EY Workshop: Ahmed and Travis

Our team enjoyed the EY Workshop with Zach Alam presenting on the privacy solutions that EY offers.
More specifically we learned about the various use cases and possible implementations for this technology for
enterprize solutions. While the information shared during the presentation was informative and 
primarily focused on Nightfall, the ZKP optimistic solution, we were very intrigued by the privacy capabilities 
so we spoke to Zach after the presentation. Zach was able to recommend that we take a look at EY's "Starlight" solution
that allows for privacy within a Solidity Smart Contract.

# Requirement 2:​

Solution must be designed to run on a public network.​

Provide documentation on which public network(s) your solution uses.​
Sepolia Testnet

# ​Requirement 3:​

Solution must be designed to run under privacy (implementation optional).​

Write one paragraph on why your solution will benefit from implementing privacy.​

Privacy in blockchain transactions is vital for safeguarding sensitive information and increasing user trust. Privacy is essential for our solution so we selected the "Starlight" solution, and provided an architecture diagram showcasing how our solution bridges the gap between the public network and the privacy solution, along with the services, connections, data/tokens shared, and workflows used under privacy.

Our solution will benefit from implementing privacy to protect citizen journalists from exposing their personal information.
Citizen Journalists are encouraged to use our application to post their content to social media platforms. However, at times they may be
covering news in dangerous parts of the world, which puts them at risk to having their information exposed to bad actors. By making this personal 
information private, we can protect them from this negative situation.

Write one paragraph on which privacy solution you selected (and why).​

We selected the EY Starlight privacy solution. This solution allows us to make certain data within our smart contract private so that bad actors are
unable to access it.

Create an Architecture diagram on how your solution will bridge between the public network and a privacy solution (ie: Starlight).   
Solidity contract --> Zolidity contract --> zappify --> zApp
![Nodify Architecture EY Starlight](https://github.com/sebastianbarkan/Nodify/assets/111543202/c1e39d13-72f9-4050-bf61-bb08ae8059f7)
       ​
What services & connections will you use?          ​
EY Starlight

What workflow(s) will be used under privacy?
The Nodify Solidity Contract will be transpiled into a Zolidity Contract.
