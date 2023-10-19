## Organization

I organized my games in an Excel workbook and made sheets for each date I played an extended session of ranked matchmaking. I refer to these as "Ranked Sessions" in the domain of this project. Each Ranked Session tracks:
- my starting LP
- my ending LP
- each match I play and the metadata for each match
- the date of the session

Each match in a session is referred to as a "Ranked Match" in the domain of the project. I define a match as a singular first-to-two-rounds game and **NOT** as a first to two set. Each Ranked Match tracks:
- my LP delta for that match
- whether I won or lost that match
- my opponent's character
- the replay id associated with the match

To make this easy to work with for a pure frontend website, [I wrote a Python script](https://github.com/jmarkman/sf5-ranked-data-reader) to coalesce the data in my Excel sheet into a collection of JSON objects.

## Issues with my data

As I worked through aggregating and displaying my data, I ran into a few issues
- I didn't have consistent naming schemes for Zangief (Zangief and Gief), M. Bison (M. Bison and Bison), and R. Mika (R. Mika and Mika)
- I had a ragequit somewhere in the middle of the grind and there was no replay information for that game (was my second ragequit in ranked for my entire time playing SF5, the first being in base bronze)
- I forgot to record the replay ids for an entire session I played back in February 2023

The renames were easy to change, but the replays for that one February 2023 session were gone and the replay for the RQ never existed in the first place. Thankfully, the rest of the data was consistent and I was able to construct a solid picture of my progress from Super Platinum to Diamond.

## Things I would change in hindsight/try in a similar project

1. Rather than group matches within Ranked Sessions, I'll probably keep track of singular ranked matches and date them. 

I ended up aggregating all of the singular ranked matches in larger sequences so I could project them into different subsets (i.e., per-character win/loss, character frequency, all matches) and my Ranked Session concept didn't come into play outside of the change in session LP between sessions visualization. Having a collection of timestamped Ranked Matches would mean that I can aggregate them on demand into sessions, and I can do more fine-grained analyses involving time between matches.

2. Rather than making an Excel sheet, I'd have everything stored in a (cloud) database and accessible via an API

Since another version of this project would be focused on a newer game (in this case, Street Fighter 6), there's a lot more room for tracking lifetime progress rather than a snapshot of my time playing the game. Additionally, I could add a rather large bit of flare on the visualization side and allow anyone who's more technically inclined to perform SQL-like queries on copies of my data.

3. I would not use TypeScript/JavaScript for performing data aggregation and projection

To be frank, it would be easier to develop a frontend if a lot of the data manipulation concerns were outsourced to any other language that wasn't TypeScript/JavaScript. Everything I've had to do in terms of aggregating data was honestly a bit of a pain in the ass because I'd find myself constantly going "Man, you know what would be sick? If I could just do this bomb-ass C# LINQ query to project all the data from my matches into a list of anonymous \{string, WinLossEnum\} objects"

~~~csharp
var characterWinLossSequence = rankedSessions.SelectMany(s => s.Matches).Select(m => new { m.Opponent, m.Result });
~~~

JS map, filter, and reduce are much more obtuse in comparison and not as straightforward when it comes to handling nested sequences. If I could have all of that projection logic off the frontend, it'd be much easier to focus on the pure visual design part of a corresponding frontend. The more I've worked on this project, the more I've come to simultaneously appreciate and dislike JavaScript.

4. Maybe not use an enum for concepts like "Win" and "Loss"

I thought I was going to be cool and convert every instance of me typing "W" or "L" into the Excel workbook into an enum I could use with TypeScript's enum implementation, but that didn't go over so well with how ChartJS works with data under the hood. I ended up foregoing the idea and doing a bunch of string comparison and counting instead. Oops.

5. Don't be afraid to use libraries from the get-go

When I first started out with the idea of making a frontend, I was deadset on using D3 because that's the library I had seen used everywhere in creating diagrams and charts whenever a project was shared on HackerNews. I was also deadset on using React to further my experience using it. Fun fact, D3 and React clash at a conceptual level because both modify the DOM to accomplish their respective tasks. Adding the usage of TypeScript to the mix was another huge blocker to using D3 and I spent a lot of time struggling to get things going because I wanted to reduce my usage of libraries.

There's a time and a place for using libraries. You don't need one for adding padding to the entire left side of your website. However, it's kind of handy to have a modern and sufficiently documented library for generating charts and diagrams so you're not stuck spinning your own wheels trying to figure out how the hell some old battle-tested library works with newer technology. Big waste of time to optimize/challenge yourself like that; use libraries intelligently.