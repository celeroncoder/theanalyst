import { Container } from "@mantine/core";
import { useSession } from "next-auth/react";
import { HeaderTabs } from ".";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children: child,
}) => {
  const { data } = useSession();
  return (
    <div>
      <HeaderTabs
        user={{ image: data!.user?.image!, name: data?.user?.name! }}
        tabs={[
          { name: "home", url: "/" },
          { name: "leaderboard", url: "/leaderboard" },
          { name: "forums", url: "/forum" },
        ]}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {child}
      </div>
    </div>
  );
};
