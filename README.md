# Nodify
Using Gitcoin Passport to help citizen journalism flourish on-chain and establishing a link between news media, crowdfunding to finance journalism, and earnings for contribution to the verified journalism ecosystem.

# Inspiration
The inspiration for Nodify emerged from the growing need to address climate change at a hyperlocal level and the desire to empower local communities in managing their energy resources.

# The Problem
Sustainable energy growth, particularly solar power, faces multiple hurdles:
1.	Governance: lack of ability to easily create an energy sharing community with trusted parties. People want to opt in for sustainable energy like solar, but face hurdles and lack of community knowledge to do so.
2.	Financing: difficulty finding access to the right capita for solar users and funders wanting an easier way to find & invest in projects.
3.	Operational support: there is an urgent need for a clear path to peer-to peer local energy trading and connections to energy stakeholders (eg. power companies).
With Nodify, anyone anywhere can transform their renewable energy resources into a vested community of energy sharing stakeholders.
Imagine if you could be part of a solar energy community and contribute and earn from it while having both financial gains and a cleaner climate as the upside.

# Quick Links
Project Demo: https:// 
Github Repo: https://github.com/sebastianbarkan/Nodify/
What it does
# Our Solution
A dApp that allows users to:
1.	Create an energy community with DAO governance
2.	Raise financing through a crowd lending campaign
3.	Conduct peer-to-peer local energy trading with a dashboard to track your renewable energy positive impact
Nodify is a DAO based platform designed to facilitate the management of energy communities. The platform is designed to facilitate energy community creation and crowdlending, which allows multiple investors to pool their money together to fund a project. The dApp enables individuals to build and join "energy communities" (group of people who can pool energy & resources) with DAO governance, create campaigns to raise funds for sustainable energy projects, and invest in sustainable energy and climate protection projects.
We are leveraging Chainlink Functions to:
1.	Fetch consumption and production data for your community members from the energy distributor.
2.	Gather energy prices from the electricity market, presently inclusive of the Iberian Market—Portugal and Spain.
3.	Fetch energy tariffs from the regulator, currently only in Portugal.
4.	Execute an algorithm that calculates the equilibrium price and the transactions within your community every hour.
How we built it

**Tech stack:** React, Typescript, Tailwind, EVM-compatible smart contracts written in Solidity provides business logic and trust for the platform, IPFS to store images of energy community membership NFTs, Chainlink Functions with Automation, Magic Link
 
# Smart contract functionalities:
The smart contracts used in Nodify provide the following: Create new Communities: Users can use the platform to create energy communities with a DAO governance. Energy Communities are defined in regulatory frameworks across Europe and USA to allow citizens, businesses and public entities to take an active role in decarbonization. One of the advantages is the possibility of exchanging energy between the members of the community in a P2P (peer-to-peer) scheme.
DAO governance: The DAO should help members decide whom to bring in or out of the community, and allow for shared decision making on investments, assets maintenance, energy sharing, community operation, etc.
Financing: The Crowdloan smart contract allows investors to pledge assets to a particular community. During a certain period the funds are locked. Afterwards, the investors are able to withdraw their funds plus the yield.
Operation Support: The platform leverages Chainlink Functions to fetch the following: a. energy prices from the electricity market, b. energy traffis from the regulator c. community members consumption and production from the energy distributor and d. execute market algorithm (double auction) to calculate the equilibrium price and transaction every hour.
The data is stored on chain, can be used by 3rd party providers to bill members according to the market results. It could also be used, for an on-chain settlement between members of the community. This feature has so far been developed for the Iberian Market (Portugal and Spain).
Challenges we ran into
We took up the challenge of aggregating the data from various sources and incorporating Chainlink Functions to build the most informative level of dashboard info for our users. Our solution works to bridge Web3 with Web2 and we found the process was very helpful using Chainlink. We will work on solving the local electric regulatory issues with further reach into the markets and we find that certain markets are more open to energy communities formation. We see our project development in creating a hybrid of a dApp and a educational resource to help bring the communities of stakeholders onboard with this streamlined way of growing energy communities.
Accomplishments that we're proud of
We excited about finishing our dApp for the hackathon and building a well-coordinated team with clear vision for developing the project. We’ve managed to allow the creation of an energy community, bring on-board community members, generate a crowd lending campaign, and build a dashboard with data coming in from multiple sources using Chainlink. We were excited to get a strong understanding of the Chainlink Functions feature and look forward to continue to learn and improve as we build further.
# What we learned
We learned that when re-thinking existing energy communities with a blockchain based governance it fundamentally changes the game and creates new opportunities and a better alignment with the best pricing for solar users. The Chainlink Functions feature opened up possibilities to integrate off-chain data that makes the market algorithm execution smooth and efficient. The whole process makes it easier to make decisions as an energy community and as stakeholders in the community.
# What's next for Nodify
With the right funding we aim to target the growing solar energy market and:
1.	Further validate assumptions
2.	Release and launch MVP on Testnet
3.	Onboard our first industrial energy community
4.	Increase the team
5.	Expand platform features and capabilities
6.	
Release and Launch MVP on Testnet: Our primary focus during this phase will be to ensure that the initial features and functions of the platform are running smoothly. This includes the implementation of governance protocols, financing mechanisms, and operational support for energy trading. By launching our MVP on Testnet, we can gather vital feedback and address any potential issues before deploying the platform on the mainnet. This iterative process will help us to create a reliable, robust, and user-friendly platform for our users.
Onboard First Industrial Community: Once our platform has been thoroughly tested and refined, our next goal is to onboard our first industrial community. We will work closely with this community to facilitate the integration process and provide necessary support. Their feedback will help us to better understand user needs and improve our services. This practical application will provide us invaluable insights into the real-world utility of our platform and will give us a solid foundation for attracting more communities in the future.
Expand Platform Features and Capabilities: Our third goal is to continue to develop and refine our platform based on the needs of our growing user base. This could include introducing additional financial instruments, creating more sophisticated governance mechanisms, or developing advanced AI capabilities to optimize energy trading. By continuously enhancing our platform, we will ensure that it remains at the cutting edge of the energy sector and that it continues to provide the best possible value to our users. We will also explore partnerships with other organizations to expand our reach and improve our platform's effectiveness.

