import { Icon } from "@/components/icons";
import { getSiteConfig } from "@/features/shop/data/site-config";

const STEPS = [
  {
    num: "1",
    title: "Send PayPal to",
    highlight: true,
  },
  {
    num: "2",
    title: "Join our Discord server",
  },
  {
    num: "3",
    title: "Open a ticket with payment proof",
    sub: "(screenshot)",
  },
  {
    num: "4",
    title: "Get your product or tutorial",
  },
] as const;

export function OrderInstructions() {
  const { paypalEmail, discordInvite } = getSiteConfig();

  return (
    <section
      id="order-instruction"
      className="border-js-accent bg-js-order-bg mb-10 rounded border-2 p-6 text-center"
    >
      <h2 className="text-js-accent mb-2 flex items-center justify-center gap-2 text-[22px]">
        <Icon name="pin" size={22} />
        PAYPAL ONLY – SEND PAYMENT
      </h2>
      <p className="text-js-text-muted mb-2">
        Send payment via PayPal to the email below.
      </p>

      <div className="border-js-accent bg-js-bg-card2 mx-auto my-4 inline-block rounded border px-4 py-3">
        <div className="text-js-text-dim flex items-center justify-center gap-2 text-xs tracking-[2px] uppercase">
          <Icon name="mail" size={14} />
          PayPal Email
        </div>
        <div className="text-js-accent text-2xl font-bold tracking-wide max-sm:text-lg">
          {paypalEmail}
        </div>
      </div>

      <p className="text-js-text-dim mx-auto mb-4 flex max-w-xl items-start justify-center gap-2 text-sm">
        <Icon
          name="triangle-alert"
          size={16}
          className="text-js-danger-soft mt-0.5 shrink-0"
        />
        <span>
          For <strong>other payment methods</strong> (Crypto, Bank Transfer,
          etc.), open a ticket on Discord.
        </span>
      </p>

      <div className="my-5 flex flex-wrap justify-center gap-6 max-sm:flex-col max-sm:items-center">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="border-js-border bg-js-bg-card min-w-[150px] rounded border px-6 py-4"
          >
            <div className="text-js-accent text-2xl font-bold">{step.num}</div>
            <div className="text-js-text-muted mt-1 text-sm">
              {step.num === "1" && (
                <>
                  Send PayPal to
                  <br />
                  <strong className="text-js-accent">{paypalEmail}</strong>
                </>
              )}
              {step.num === "2" && (
                <>
                  Join our
                  <br />
                  Discord server
                </>
              )}
              {step.num === "3" && (
                <>
                  Open a ticket
                  <br />
                  with payment proof{" "}
                  <small className="text-js-text-faint">(screenshot)</small>
                </>
              )}
              {step.num === "4" && (
                <>
                  Get your product
                  <br />
                  or tutorial
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        href={discordInvite}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-js-discord hover:bg-js-discord-hover mt-4 inline-flex items-center gap-2 rounded px-10 py-3.5 text-lg font-bold text-white no-underline"
      >
        <Icon name="message-circle" size={20} />
        JOIN DISCORD & OPEN TICKET
      </a>

      <p className="text-js-text-dim mt-4 flex items-center justify-center gap-2 text-sm">
        <Icon name="triangle-alert" size={16} className="text-js-danger-soft" />
        <span>
          <strong className="text-js-danger-soft">
            NO TICKET = NO DELIVERY
          </strong>
          <br />
          We only process orders through Discord tickets.
        </span>
      </p>
    </section>
  );
}
