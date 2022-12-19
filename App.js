import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdEventType,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
const iAdUnitId = TestIds.INTERSTITIAL;
// const interstitial = InterstitialAd.createForAdRequest(iAdUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });
const rAdUnitId = "ca-app-pub-6242860245790899/7005801633";
const rewarded = RewardedAd.createForAdRequest(rAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});
export default function App() {
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("Loaded ??");
        rewarded.show();
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of", reward);
      }
    );
    rewarded.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  });
  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       console.log("Interstitial ad shown");
  //       interstitial.show();
  //     }
  //   );
  //   interstitial.load();
  //   return unsubscribe;
  // }, []);
  return (
    <View style={styles.container}>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={"ca-app-pub-6242860245790899/7441163328"}
      />
      <Text>Open up Ap p.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
