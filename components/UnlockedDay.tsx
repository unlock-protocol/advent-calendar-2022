/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseDay from "./BaseDay";
import days from "../lib/days";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import makeItSnow from "../lib/snow";
import { BsTwitter } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { ethers } from "ethers";
import isWinner from "../lib/getWinners";
interface UnlockedDayProps {
  day: number;
  user: any;
}

interface ModalProps {
  user: any;
  day: number;
  setShowModal: (show: boolean) => void;
}

interface Content {
  title?: string;
  description?: string;
  image?: string;
  youtube?: string;
  link?: string;
}

const Modal = ({ day, setShowModal, user }: ModalProps) => {
  const [content, setContent] = useState<Content | null>(null);
  const tweetIntent = new URL("https://twitter.com/intent/tweet");
  tweetIntent.searchParams.set(
    "text",
    `🎁 I have just unlocked Day ${day} of the @unlockProtocol advent calendar!`
  );
  tweetIntent.searchParams.set("url", "https://advent.unlock-protocol.com");

  useEffect(() => {
    const checkStatus = async () => {
      if (day == 24) {
        const day24 = {
          title: "A special something for some special Locksmiths",
          description:
            "Unfortunately, you have not won a gift. :( That said, thank you so much for being part of Unlock’s 2022, please do stay in touch, and wishing you a prosperous 2023.",
          image: "/images/advent-day24.png",
        };
        // check if user is winner!
        const winner = await isWinner(user);
        if (winner > -1) {
          day24.description =
            "We are giving away a few special gifts to three members of the community from Ledger and other friends and — 🍾 congrats, you are one of the winners! Our team will be in touch with you via email with details in the next few days.";
        }

        setContent(day24);
      } else {
        setContent(days[day - 1]);
      }
    };
    checkStatus();
  }, [day]);

  if (!content) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-red text-yellow outline-none focus:outline-none pt-5">
            <span
              onClick={() => setShowModal(false)}
              className="absolute text-xl px-4 py-3 right-0 top-0 text-white font-bold cursor-pointer"
            >
              ✕
            </span>
            <div className="flex items-center justify-center text-2xl px-5 mb-3">
              ❄️ ⛄ ❄️ 
            </div>
            <div className="flex items-start justify-between px-5">
              <h3 className="text-3xl font-semibold">{content.title}</h3>
            </div>
            {/*body*/}
            <div className="relative px-5 flex-auto">
              <div className="my-4 text-lg leading-relaxed">
                {day == 24 && (
                  <p className="my-4 text-lg leading-relaxed">
                    🙏 Thank you for being part of the Unlock Protocol community
                    this year!
                  </p>
                )}
                <ReactMarkdown className="markdown" skipHtml={false}>
                  {content.description!}
                </ReactMarkdown>
                {day == 24 && (
                  <p className="my-4 text-lg leading-relaxed text-sm">
                    Please see the{" "}
                    <Link
                      target="_blank"
                      className="underline"
                      href="https://unlockprotocol.notion.site/Unlock-Contests-and-Sweepstakes-Standard-Terms-and-Conditions-1e00ab3d30f24a8fb350a561fddc9f66"
                    >
                      official rules
                    </Link>{" "}
                    for country and other eligibility.
                  </p>
                )}
              </div>
              {content.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img alt="money" src={content.image} />
                </div>
              )}
              {content.youtube && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={content.youtube}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="container space-x-2  min-w-full flex flex-row items-center flex items-center justify-center pb-5 rounded-b">
              {content.link && (
                <Link
                  className="border text-white font-bold py-2 px-4 mt-3 rounded whitespace-nowrap "
                  href={content.link!}
                  target="_blank"
                >
                  <SlMagnifier className="inline-block mr-2" />
                  Learn more!
                </Link>
              )}
              <Link
                className="border whitespace-nowrap	 text-white font-bold py-2 px-4 mt-3 rounded"
                href={tweetIntent.toString()}
              >
                <BsTwitter className="inline-block mr-2" />
                Tweet this!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const UnlockedDay = ({ user, day }: UnlockedDayProps) => {
  const { query, replace } = useRouter();
  const [showModal, setShowModal] = useState(
    query && query.day && parseInt(query.day.toString(), 10) === day
  );

  if (query && query.day && parseInt(query.day.toString(), 10) === day) {
    makeItSnow();
    if (!query.admin) {
      replace("/", undefined, { shallow: true });
    }
  }

  return (
    <>
      <BaseDay day={day} onClick={() => setShowModal(true)}>
        <span className="w-full cursor-pointer absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
          🦌
        </span>
      </BaseDay>
      {showModal ? (
        <Modal user={user} day={day} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default UnlockedDay;
