import React from 'react';
import Carousel from './TextOnly';

function Slide1 () {
  return (
    <>
      <p>
        Libbe offers four plans, each organized into 15 minute daily readings.  Each day, you are guided through the
        larger story, while being exposed to relevant surrounding texts (such as Psalms, Proverbs, and the Prophetic
        letters).
      </p>

      <p>
        Each plan exposes the reader to all areas of scripture, curated in daily doses that promote increased clarity
        and understanding.  Click the arrow below to learn more about each plan.
      </p>
    </>
  );
}

function Slide2 () {
  return (
    <>
      <p>
        Virtually the entire Bible in 260 individual installments.  The only significant exclusions in Plan A are the gospel of Mark (due to overlap with Matthew and Luke), as well as large parts of Chronicles (which overlap with Kings).
      </p>

      <p>
        Plan A is best suited to those who wish to read the entire Bible (likely not for the first time), but desire the better understanding provided by the careful arrangement of texts into coherent and relevant daily doses.
      </p>
    </>
  );
}

function Slide3 () {
  return (
    <>
      <p>
        The bulk of the Bible, divided into 200 individual installments.  Includes all major events, most poetic and prophetic writings, and virtually all of the New Testament.  Excludes some minor prophets, and areas of content repetition.
      </p>

      <p>
        Plan B is a good choice for those who want a comprehensive reading, but get bogged down by finer details of law, areas of repetition and ceremonial regulations, and other non-narrative content.
      </p>
    </>
  );
}

function Slide4 () {
  return (
    <>
      <p>
        Covers nearly half the Bible in 100 daily readings.  Includes all major events, content from every New Testament book, as well as selective exposure to minor prophets and wisdom literature.  Excludes most secondary content; primarily in areas of Law, Wisdom, and Old Testament Prophetic books.
      </p>

      <p>
        Plan C is an excellent choice for first or second time readers, interested in adding a bit more background, detail, and texture to the Bible’s core narrative.
      </p>
    </>
  );
}

function Slide5 () {
  return (
    <>
      <p>
        Exposure to 50 books of the Bible, through 52 daily readings.  Covers all major themes, stories, and revelations.  Provides a sufficient overview of Old Testament events, God’s interaction with people, prophecies regarding a new creation and savior, Jesus’ words and actions, as well as early church development.
      </p>

      <p>
        Plan D is an excellent choice for non Christians, new Christians, first time Bible readers, or those who would like a concise overview of the Bible.
      </p>
    </>
  );
}

const items = [
  {
    headerText: '“The Four Reading Plans Explained”',
    component: <Slide1 />
  }, {
    headerText: 'Plan A: Read 95% of the Bible',
    component: <Slide2 />
  }, {
    headerText: 'Plan B: Read 70% of the Bible',
    component: <Slide3 />
  }, {
    headerText: 'Plan C: Read 40% of the Bible',
    component: <Slide4 />
  }, {
    headerText: 'Plan D: Read 20% of the Bible',
    component: <Slide5 />
  }
];

const Plans = (props: Record<string, unknown>) => {
  return (
    <Carousel {...props} items={items} textColor='#7f7f7f' />
  );
};

export default Plans;
