"use client"

import { Label } from "@/components/ui/label"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Eye,
  EyeOff,
  Send,
  ArrowUpDown,
  Receipt,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Building,
  Car,
  Phone,
  Shield,
  DollarSign,
  FileText,
  PiggyBank,
  Home,
  Banknote,
  Fingerprint,
  ArrowLeft,
  QrCode,
  Search,
  Bell,
  User,
  ChevronRight,
  FileCheck,
  ToggleRight,
  ToggleLeft,
  FileBarChart,
  CreditCardIcon,
  Droplets,
  MoreHorizontal,
  LogOut,
  Type,
  Settings,
  Mic,
} from "lucide-react"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Transaction {
  id: string
  type: "income" | "expense" | "transfer"
  amount: number
  description: string
  date: string
  balance: number
}

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string | React.JSX.Element
  time: string
}

interface AccountBalance {
  type: "twd" | "foreign" | "loan" | "securities"
  label: string
  amount: number
  currency: string
  change?: string
  changeType?: "up" | "down" | null
}

function LoginPage({ onLoginSuccess, onDemo1Login }: { onLoginSuccess: () => void; onDemo1Login: () => void }) {
  const [loginForm, setLoginForm] = useState({
    userId: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (loginForm.userId === "USER" && loginForm.password === "demo01") {
        onDemo1Login()
      } else {
        onLoginSuccess()
      }
    }, 1500)
  }

  const handleFingerprintLogin = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-2xl">福</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">小福德銀行</h1>
            <p className="text-muted-foreground text-lg mt-2">輕鬆玩轉App</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="userId" className="text-lg font-medium">
                使用者代號
              </Label>
              <Input
                id="userId"
                placeholder="請輸入使用者代號"
                value={loginForm.userId}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, userId: e.target.value }))}
                className="text-lg h-12 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-lg font-medium">
                密碼
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入密碼"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="text-lg h-12 mt-2 pr-12"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 mt-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={!loginForm.userId || !loginForm.password || isLoading}
            className="w-full text-lg h-12 bg-primary hover:bg-primary/90"
          >
            {isLoading ? "登入中..." : "登入"}
          </Button>

          <Button
            onClick={handleFingerprintLogin}
            variant="outline"
            disabled={isLoading}
            className="w-full text-lg h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            <Fingerprint className="w-5 h-5 mr-2" />
            {isLoading ? "驗證中..." : "指紋登入"}
          </Button>

          <div className="space-y-3 pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full text-base text-muted-foreground"
              onClick={() => setShowForgotPassword(true)}
            >
              忘記密碼？
            </Button>
            <Button variant="ghost" className="w-full text-base text-muted-foreground">
              線上開戶
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>24小時客服專線：0800-123-456</p>
            <p className="mt-1">為保障您的權益，請勿將帳號密碼告知他人</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">忘記密碼</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm leading-relaxed space-y-3">
              <p className="font-medium">請選擇以下方式重設密碼：</p>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">1.</span>{" "}
                  使用個人電腦並備妥金融卡及讀卡機，於個人網路銀行頁面點選忘記密碼
                </p>
                <p>
                  <span className="font-medium">2.</span> 至本行ＡＴＭ點選重置個人網路銀行代號與密碼
                </p>
                <p>
                  <span className="font-medium">3.</span> 攜帶身分證及原留印鑑至鄰近分行辦理
                </p>
              </div>
            </div>
            <Button onClick={() => setShowForgotPassword(false)} className="w-full">
              我知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Demo1PasswordChangePage({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [passwordForm, setPasswordForm] = useState({
    newUserId: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = () => {
    setError("")

    if (!passwordForm.newUserId || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError("請填寫所有欄位")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("密碼不一致")
      return
    }

    onComplete()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle className="text-xl">新客戶變更使用者代號及密碼</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">請設定您的新登入資訊</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="newUserId" className="text-base font-medium">
                新使用者代號
              </Label>
              <Input
                id="newUserId"
                placeholder="請輸入新使用者代號"
                value={passwordForm.newUserId}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newUserId: e.target.value }))}
                className="text-base h-12 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-base font-medium">
                新密碼
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="請輸入新密碼"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                className="text-base h-12 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-base font-medium">
                確認密碼
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="請再次輸入密碼"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="text-base h-12 mt-2"
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

          <Button onClick={handleSubmit} className="w-full text-base h-12 bg-primary hover:bg-primary/90">
            確認
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Demo1MainView({
  fontScale,
  setFontScale,
  showSettingsPanel,
  setShowSettingsPanel,
  onLogout,
  accountBalances,
  showBalance,
  setShowBalance,
  chatMessages,
  setChatMessages,
  chatInput,
  setChatInput,
  isListening,
  setIsListening,
  handleSendMessage,
  handleVoiceInput,
  handleBalanceInquiry,
  handleShortcutClick,
  handleSettingsOption,
  showTransferModal,
  showPaymentModal,
  showTransactionModal,
  showOtherFunctionsModal,
  setShowOtherFunctionsModal,
  otherFunctionsLevel,
  setOtherFunctionsLevel,
  handleOtherFunctionsOption,
  showCreditCardDetailsModal,
  setShowCreditCardDetailsModal,
}: any) {
  const [isDynamicInterface, setIsDynamicInterface] = useState(false)

  const [demo1Shortcuts, setDemo1Shortcuts] = useState([
    { icon: ArrowUpDown, label: "轉帳", color: "bg-secondary", action: "transfer" },
    { icon: FileText, label: "交易明細", color: "bg-primary", action: "transactions" },
    { icon: MoreHorizontal, label: "其他功能", color: "bg-accent", action: "other-functions" },
  ])

  const handleDemo1OtherFunctionsOption = (option: string) => {
    if (option === "被掃碼") {
      // Just navigate to QR code, don't add shortcut yet
      handleOtherFunctionsOption(option)
    } else {
      handleOtherFunctionsOption(option)
    }
  }

  const handleQRCodeClick = () => {
    // Close the dialog first
    setShowOtherFunctionsModal(false)
    setOtherFunctionsLevel("main")

    // Add 土銀Pay to shortcuts after QR code is clicked
    setDemo1Shortcuts((prev) => {
      const hasTubankPay = prev.some((shortcut) => shortcut.action === "tubank-pay")
      if (!hasTubankPay) {
        // Find the index of "其他功能" and insert before it
        const otherFunctionsIndex = prev.findIndex((shortcut) => shortcut.action === "other-functions")
        const newShortcuts = [...prev]
        newShortcuts.splice(otherFunctionsIndex, 0, {
          icon: Smartphone,
          label: "土銀Pay",
          color: "bg-green-500",
          action: "tubank-pay",
        })
        return newShortcuts
      }
      return prev
    })
  }

  const handleDemo1ShortcutClick = (action: string) => {
    if (action === "tubank-pay") {
      const newMessage = {
        id: Date.now().toString(),
        type: "ai" as const,
        content: "您選擇了土銀Pay功能，請開啟相機掃描QR碼。",
        time: "剛剛",
      }
      setChatMessages((prev: any) => [...prev, newMessage])
    } else {
      handleShortcutClick(action)
    }
  }

  const demo1AccountBalances = accountBalances.filter(
    (account: any) => account.type === "twd" || account.type === "loan",
  )

  const handleVoiceInputFn = () => {}
  const handleSendMessageFn = () => {}

  return (
    <div
      className={`w-full max-w-md mx-auto min-h-screen bg-background text-foreground flex flex-col ${fontScale === "large" ? "text-base" : ""}`}
    >
      <header className="bg-card border-b border-border p-2 rounded-t-xl flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">福</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">小福德銀行</h1>
              <p className="text-xs text-muted-foreground">輕鬆玩轉App</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDynamicInterface(!isDynamicInterface)}
              className="flex items-center gap-1 text-xs"
            >
              {isDynamicInterface ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
              一鍵切換
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontScale(fontScale === "normal" ? "large" : "normal")}
              className="flex items-center gap-1 text-xs"
            >
              <Type className="w-3 h-3" />
              字型
            </Button>
            <Sheet open={showSettingsPanel} onOpenChange={setShowSettingsPanel}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs bg-transparent">
                  <Settings className="w-3 h-3" />
                  設定
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-sm">
                <SheetHeader>
                  <SheetTitle>設定</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">個人服務</h3>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("地址/電話/電子信箱變更")}
                      >
                        地址/電話/電子信箱變更
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("使用者代號密碼變更")}
                      >
                        使用者代號密碼變更
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("金融卡管理")}
                      >
                        金融卡管理
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">系統設定</h3>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("語言")}
                      >
                        語言
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("手機綁定")}
                      >
                        手機綁定
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("智慧登入")}
                      >
                        智慧登入
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("行動身分驗證FIDO申請")}
                      >
                        行動身分驗證FIDO申請
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("推播OTP申請")}
                      >
                        推播OTP申請
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-1 text-xs bg-transparent"
            >
              <LogOut className="w-3 h-3" />
              登出
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col h-screen">
        <Card className="bg-card border border-border rounded-lg shadow-sm" style={{ height: "30vh" }}>
          <div className="h-full flex flex-col p-0.5 space-y-0.5">
            {/* 常用功能 - 在上半部 */}
            <div className="flex-1">
              <CardHeader className="pb-0 pt-0.5 px-2">
                <CardTitle className="text-xs flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-primary" />
                  常用功能
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0.5 px-2">
                <div className="grid grid-cols-4 gap-1">
                  {demo1Shortcuts.map((shortcut, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-8 flex flex-col items-center justify-center gap-0 text-xs hover:bg-primary/10 bg-transparent p-1 ${
                        shortcut.action === "other-functions" ? "border-dashed" : ""
                      }`}
                      onClick={() => handleDemo1ShortcutClick(shortcut.action)}
                    >
                      <shortcut.icon className="w-3 h-3 text-primary" />
                      <span className="font-medium text-xs">{shortcut.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </div>

            {/* 帳戶總覽 - 在下半部 */}
            <div className="flex-1">
              <CardHeader className="pb-0 pt-0.5 px-2">
                <CardTitle className="text-xs flex items-center gap-1">
                  <CreditCard className="w-3 h-3 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-xs">福</span>
                  </CreditCard>
                  帳戶總覽
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="ml-auto p-0"
                  >
                    {showBalance ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0.5 px-2">
                <div className="grid grid-cols-4 gap-1">
                  {demo1AccountBalances.map((account: any) => (
                    <div key={account.type} className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">{account.label}</div>
                      <div className="text-xs font-bold text-primary mb-0.5">
                        {showBalance
                          ? `${account.currency} ${account.amount.toLocaleString()}`
                          : `${account.currency} ****`}
                      </div>
                      {account.change && (
                        <div className="flex justify-center mb-0.5">
                          <Badge variant="secondary" className="text-xs h-2.5 px-1">
                            {account.changeType === "up" ? (
                              <TrendingUp className="w-1.5 h-1.5" />
                            ) : (
                              <TrendingDown className="w-1.5 h-1.5" />
                            )}
                          </Badge>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-3 p-0 text-primary hover:underline"
                        onClick={() => handleBalanceInquiry(account.type)}
                      >
                        查詢
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* AI助理 - 在最下面 */}
        <div className="flex-[2] flex flex-col bg-background">
          <div className="pb-1">
            <div className="text-sm flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-xs">福</span>
              </div>
              小福德 AI 助理
            </div>
          </div>

          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 mb-2" style={{ maxHeight: "300px" }}>
              {chatMessages.map((message: any) => (
                <div key={message.id} className={`${message.type === "user" ? "ml-2" : ""}`}>
                  <div
                    className={`rounded-lg p-2 ${
                      message.type === "user" ? "bg-primary text-primary-foreground ml-auto max-w-xs" : "bg-muted/50"
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="flex items-start gap-1">
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-foreground font-bold text-xs">福</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs leading-relaxed">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{message.time}</p>
                        </div>
                      </div>
                    )}
                    {message.type === "user" && (
                      <div>
                        <p className="text-xs">{message.content}</p>
                        <p className="text-xs opacity-70 mt-0.5">{message.time}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 space-y-2">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceInputFn}
                  className={`h-6 flex items-center gap-1 text-xs ${isListening ? "bg-red-100 border-red-300" : ""}`}
                  disabled={isListening}
                >
                  <Mic className={`w-3 h-3 ${isListening ? "text-red-600" : "text-primary"}`} />
                </Button>
                <Input
                  type="text"
                  placeholder="您好！今天有什麼可以為您服務的嗎？"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessageFn()
                    }
                  }}
                  className="flex-1 text-sm"
                />
                <Button onClick={handleSendMessageFn} disabled={!chatInput.trim()} size="sm" className="h-6">
                  <Send className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1">
                {["存摺掛失", "開戶需要什麼文件？", "基金推薦"].map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatInput(reply)
                      handleSendMessageFn()
                    }}
                    className="text-xs h-5"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Functions Modal with demo1 specific handling */}
      <Dialog open={showOtherFunctionsModal} onOpenChange={setShowOtherFunctionsModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {otherFunctionsLevel !== "main" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (otherFunctionsLevel === "tubank-pay") {
                      setOtherFunctionsLevel("twd")
                    } else if (otherFunctionsLevel === "twd") {
                      setOtherFunctionsLevel("main")
                    }
                  }}
                  className="p-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              其他功能
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {otherFunctionsLevel === "main" && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("台幣")}
                >
                  台幣
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("外幣")}
                >
                  外幣
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("貸款")}
                >
                  貸款
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("信用卡")}
                >
                  信用卡
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("證券")}
                >
                  證券
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("基金")}
                >
                  基金
                </Button>
              </>
            )}
            {otherFunctionsLevel === "twd" && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("台幣轉帳")}
                >
                  台幣轉帳
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("台幣明細")}
                >
                  台幣明細
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("土銀Pay")}
                >
                  土銀Pay
                </Button>
              </>
            )}
            {otherFunctionsLevel === "tubank-pay" && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("掃碼")}
                >
                  掃碼
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => handleDemo1OtherFunctionsOption("被掃碼")}
                >
                  被掃碼
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={otherFunctionsLevel === "qr-code"} onOpenChange={() => setOtherFunctionsLevel("tubank-pay")}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setOtherFunctionsLevel("tubank-pay")} className="p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              被掃碼
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <button
              onClick={handleQRCodeClick}
              className="w-48 h-48 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <span className="text-gray-600 text-sm">模擬 QR Code</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Card Details Modal */}
      <Dialog open={showCreditCardDetailsModal} onOpenChange={setShowCreditCardDetailsModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowCreditCardDetailsModal(false)} className="p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              信用卡交易明細
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground text-center">2025/08/01 ～ 2025/08/31</div>
            {[
              { date: "2025/08/30", merchant: "全聯福利中心", amount: -850, type: "消費" },
              { date: "2025/08/28", merchant: "中華電信", amount: -1200, type: "消費" },
              { date: "2025/08/25", merchant: "台北101", amount: -2500, type: "消費" },
              { date: "2025/08/22", merchant: "誠品書店", amount: -680, type: "消費" },
              { date: "2025/08/20", merchant: "星巴克", amount: -165, type: "消費" },
              { date: "2025/08/18", merchant: "家樂福", amount: -1350, type: "消費" },
              { date: "2025/08/15", merchant: "Netflix", amount: -390, type: "消費" },
              { date: "2025/08/10", merchant: "加油站", amount: -1800, type: "消費" },
            ].map((transaction, index) => (
              <Card key={index} className="bg-card border border-border">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                      <p className="font-medium text-sm">{transaction.merchant}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-red-600">NT$ {transaction.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function BankingApp() {
  const [isDemo1Mode, setIsDemo1Mode] = useState(false)
  const [currentView, setCurrentView] = useState<
    "main" | "demo1-a3" | "demo1-a4" | "transaction-details" | "credit-card-payment"
  >("main")

  const [isDynamicInterface, setIsDynamicInterface] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [chatInput, setChatInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(true)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [balanceQueryType, setBalanceQueryType] = useState<string>("")
  const [fontScale, setFontScale] = useState<"normal" | "large">("normal")
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  const [showOtherFunctionsModal, setShowOtherFunctionsModal] = useState(false)
  const [otherFunctionsLevel, setOtherFunctionsLevel] = useState<"main" | "twd" | "tubank-pay" | "qr-code">("main")
  const [showCreditCardDetailsModal, setShowCreditCardDetailsModal] = useState(false)

  const [accountBalances] = useState<AccountBalance[]>([
    { type: "twd", label: "台幣", amount: 125680, currency: "NT$", change: "+2.5%", changeType: "up" },
    { type: "foreign", label: "外幣", amount: 8500, currency: "USD", change: "-0.8%", changeType: "down" },
    { type: "loan", label: "貸款", amount: 850000, currency: "NT$", change: null, changeType: null },
    { type: "securities", label: "證券", amount: 320000, currency: "NT$", change: "+8.5%", changeType: "up" },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: (
        <span>
          投資不必等！土銀證券定期定額，每筆1元輕鬆入門。
          <a
            href="https://eapply.landbank.com.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600 ml-1"
          >
            土銀證券開戶
          </a>
        </span>
      ),
      time: "剛剛",
    },
    {
      id: "2",
      type: "ai",
      content: (
        <span>
          【土銀JCB信用卡】114年JCB信用卡卡友專屬刷卡
          <a
            href="https://www.landbank.com.tw/Bulletin/Detail/7920e64c-54f8-4fe4-8411-b27a00388893?code=H300"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600"
          >
            優惠內容
          </a>
        </span>
      ),
      time: "剛剛",
    },
  ])

  const [mainChatMessages, setMainChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "📈 您關注的台積電股價上漲 2.5%，目前價格 NT$580",
      time: "剛剛",
    },
    {
      id: "2",
      type: "ai",
      content: (
        <span>
          信用卡繳款日是9/15，別忘了繳費喔！點此快速繳費：
          <button
            onClick={() => setShowPaymentModal(true)}
            className="text-blue-500 underline hover:text-blue-600 ml-1"
          >
            信用卡繳費
          </button>
        </span>
      ),
      time: "剛剛",
    },
  ])

  const [recentTransactions] = useState<Transaction[]>([
    { id: "1", type: "expense", amount: -850, description: "全聯福利中心", date: "2024-01-15", balance: 125680 },
    { id: "2", type: "income", amount: 45000, description: "薪資轉帳", date: "2024-01-15", balance: 126530 },
    { id: "3", type: "expense", amount: -1200, description: "中華電信", date: "2024-01-14", balance: 81530 },
    { id: "4", type: "transfer", amount: -5000, description: "轉帳給王小明", date: "2024-01-14", balance: 82730 },
  ])

  const [transferForm, setTransferForm] = useState({
    recipient: "",
    amount: "",
    note: "",
  })

  const shortcuts = [
    { icon: ArrowUpDown, label: "轉帳匯款", color: "bg-secondary", action: "transfer" },
    { icon: PiggyBank, label: "定期存款", color: "bg-accent", action: "deposit" },
    { icon: FileText, label: "交易明細", color: "bg-primary", action: "transactions" },
  ]

  const handleDebitCardLossOption = (option: "immediate" | "info") => {
    let responseContent: string

    if (option === "immediate") {
      responseContent = "好的，已成功掛失金融卡，若要補辦金融卡請洽鄰近分行辦理"
    } else {
      responseContent = "了解更多掛失資訊，請參考官網或聯繫客服。"
    }

    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content: responseContent,
      time: "剛剛",
    }

    // Only add to main chat messages (A2 page), not demo1
    if (!isDemo1Mode) {
      setMainChatMessages((prev) => [...prev, aiMessage])
    }
  }

  const getAIResponse = (userMessage: string): string | React.JSX.Element => {
    const message = userMessage.toLowerCase()

    if (message.includes("餘額") || message.includes("查詢")) {
      return `您的活期存款餘額為 NT$ ${accountBalances[0].amount.toLocaleString()}，本月收入增加15%，理財表現不錯喔！`
    } else if (message.includes("信用卡交易明細") || message.includes("請顯示我這個月的信用卡交易明細")) {
      return (
        <span>
          好的！這是您2025/08/01～2025/08/31的信用卡交易明細！
          <button
            onClick={() => setShowCreditCardDetailsModal(true)}
            className="text-blue-500 underline hover:text-blue-600 ml-1"
          >
            信用卡交易明細
          </button>
        </span>
      )
    } else if (message.includes("金融卡掛失")) {
      return (
        <div>
          <p className="mb-2">
            好的，很抱歉聽到您遇到這個問題。為了保障您的權益，請問您是否需要立即透過本服務進行線上掛失？
          </p>
          <div className="space-y-1">
            <button
              onClick={() => handleDebitCardLossOption("immediate")}
              className="text-blue-500 underline hover:text-blue-600 block"
            >
              是，立即掛失
            </button>
            <button
              onClick={() => handleDebitCardLossOption("info")}
              className="text-blue-500 underline hover:text-blue-600 block"
            >
              否，先了解更多資訊
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">請選擇您的需求，掛失成功後，我們會立即停止該卡的交易功能</p>
        </div>
      )
    } else if (message.includes("請推薦基金")) {
      return (
        <div>
          <p className="mb-2">您好，以下是根據您的風險承受度為您列出的基金</p>
          <div className="space-y-1 mb-2">
            <a
              href="https://landbank.moneydj.com/fund-page.html?sUrl=$W$WR$WR01]DJHTM{A}ACGC01-A101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600 block"
            >
              A101 永豐永豐基金-A類型
            </a>
            <a
              href="https://landbank.moneydj.com/fund-page.html?sUrl=$W$WR$WR01]DJHTM{A}ACTT06-A222"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600 block"
            >
              A222 台新主流基金
            </a>
          </div>
          <p>您是否想了解更多基金資訊，小福德幫您聯繫分行理財專員獲取更全面的理財資訊</p>
        </div>
      )
    } else if (message.includes("轉帳") || message.includes("匯款")) {
      return "我來協助您進行轉帳。請點擊左側的「轉帳匯款」功能，或告訴我您要轉帳的金額和對象。"
    } else if (message.includes("開戶") || message.includes("文件")) {
      return "開戶需要攜帶：1️⃣ 身分證正本 2️⃣ 第二證件（健保卡/駕照） 3️⃣ 印章 4️⃣ 初次存款（建議1000元以上）。線上預約可節省等候時間！"
    } else if (message.includes("基金") || message.includes("投資")) {
      return "根據您的風險偏好，推薦以下基金：🔸 台股基金（穩健型）🔸 全球股票基金（成長型）🔸 債券基金（保守型）。需要詳細說明嗎？"
    } else if (message.includes("掛失") || message.includes("遺失")) {
      return "立即為您辦理掛失！請確認：1️⃣ 身分證字號 2️⃣ 帳戶後四碼 3️⃣ 聯絡電話。24小時客服專線：0800-123-456"
    } else {
      return "我了解您的需求，讓我為您查詢相關資訊。您也可以使用左側的快速功能，或說出具體的服務需求。"
    }
  }

  const handleVoiceInputFn = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setChatInput("請顯示我這個月的信用卡交易明細")
        setIsListening(false)
        setTimeout(() => {
          handleSendMessageFn()
        }, 100)
      }, 2000)
    }
  }

  const handleSendMessageFn = () => {
    if (chatInput.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        content: chatInput,
        time: "剛剛",
      }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(chatInput),
        time: "剛剛",
      }

      if (isDemo1Mode) {
        setChatMessages((prev) => [...prev, userMessage, aiResponse])
      } else {
        setMainChatMessages((prev) => [...prev, userMessage, aiResponse])
      }
      setChatInput("")
    }
  }

  const handleShortcutClick = (action: string) => {
    setActiveModal(action)

    if (action === "transfer") {
      setShowTransferModal(true)
      return
    }

    if (action === "payment") {
      setShowPaymentModal(true)
      return
    }

    if (action === "transactions") {
      setShowTransactionModal(true)
      return
    }

    if (action === "other-functions") {
      setShowOtherFunctionsModal(true)
      setOtherFunctionsLevel("main")
      return
    }

    const actionMessages: { [key: string]: string } = {
      transfer: "我要轉帳",
      deposit: "定期存款資訊",
      transactions: "查看交易明細",
      payment: "我要繳費",
      add: "新增功能",
    }

    if (actionMessages[action]) {
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "ai",
        content: getAIResponse(actionMessages[action]),
        time: "剛剛",
      }
      if (isDemo1Mode) {
        setChatMessages((prev) => [...prev, aiMessage])
      } else {
        setMainChatMessages((prev) => [...prev, aiMessage])
      }
    }
  }

  const handleOtherFunctionsOption = (option: string) => {
    if (otherFunctionsLevel === "main") {
      if (option === "台幣") {
        setOtherFunctionsLevel("twd")
      } else {
        setShowOtherFunctionsModal(false)
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `您選擇了${option}功能，請提供更多資訊。`,
          time: "剛剛",
        }
        if (isDemo1Mode) {
          setChatMessages((prev) => [...prev, aiMessage])
        } else {
          setMainChatMessages((prev) => [...prev, aiMessage])
        }
      }
    } else if (otherFunctionsLevel === "twd") {
      if (option === "土銀Pay") {
        setOtherFunctionsLevel("tubank-pay")
      } else {
        setShowOtherFunctionsModal(false)
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `您選擇了${option}功能，請提供更多資訊。`,
          time: "剛剛",
        }
        if (isDemo1Mode) {
          setChatMessages((prev) => [...prev, aiMessage])
        } else {
          setMainChatMessages((prev) => [...prev, aiMessage])
        }
      }
    } else if (otherFunctionsLevel === "tubank-pay") {
      if (option === "被掃碼") {
        setOtherFunctionsLevel("qr-code")
      } else {
        setShowOtherFunctionsModal(false)
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "ai",
          content: `您選擇了${option}功能，請開啟相機掃描QR碼。`,
          time: "剛剛",
        }
        if (isDemo1Mode) {
          setChatMessages((prev) => [...prev, aiMessage])
        } else {
          setMainChatMessages((prev) => [...prev, aiMessage])
        }
      }
    } else if (otherFunctionsLevel === "qr-code") {
      setShowOtherFunctionsModal(false)
    }
  }

  const handleOtherFunctionsBack = () => {
    if (otherFunctionsLevel === "twd") {
      setOtherFunctionsLevel("main")
    } else if (otherFunctionsLevel === "tubank-pay") {
      setOtherFunctionsLevel("twd")
    }
  }

  const handleTransferOption = (option: string) => {
    setShowTransferModal(false)
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content: `您選擇了${option}，請提供更多細節。`,
      time: "剛剛",
    }
    if (isDemo1Mode) {
      setChatMessages((prev) => [...prev, aiMessage])
    } else {
      setMainChatMessages((prev) => [...prev, aiMessage])
    }
  }

  const handlePaymentOption = (option: string) => {
    setShowPaymentModal(false)
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content: `您選擇了${option}，請提供更多細節。`,
      time: "剛剛",
    }
    if (isDemo1Mode) {
      setChatMessages((prev) => [...prev, aiMessage])
    } else {
      setMainChatMessages((prev) => [...prev, aiMessage])
    }
  }

  const handleBalanceInquiry = (type: string) => {
    setBalanceQueryType(type)
    setShowBalanceModal(true)
  }

  const handleTransferSubmit = () => {
    if (transferForm.recipient && transferForm.amount) {
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "ai",
        content: `轉帳申請已送出！轉帳給${transferForm.recipient} NT$ ${Number.parseInt(transferForm.amount).toLocaleString()}，預計5分鐘內完成。`,
        time: "剛剛",
      }
      if (isDemo1Mode) {
        setChatMessages((prev) => [...prev, aiMessage])
      } else {
        setMainChatMessages((prev) => [...prev, aiMessage])
      }
      setTransferForm({ recipient: "", amount: "", note: "" })
      setActiveModal(null)
    }
  }

  const handleTransactionQuery = () => {
    if (selectedAccount && startDate && endDate) {
      setShowTransactionModal(false)
      setShowTransactionDetails(true)
    }
  }

  const mockTransactions = [
    { id: "1", date: "2025-08-31", description: "全聯福利中心", amount: -850, balance: 125680, type: "支出" },
    { id: "2", date: "2025-08-30", description: "薪資轉帳", amount: 45000, balance: 126530, type: "收入" },
    { id: "3", date: "2025-08-29", description: "中華電信", amount: -1200, balance: 81530, type: "支出" },
    { id: "4", date: "2025-08-28", description: "轉帳給王小明", amount: -5000, balance: 82730, type: "轉帳" },
    { id: "5", date: "2025-08-27", description: "ATM提款", amount: -3000, balance: 87730, type: "提款" },
    { id: "6", date: "2025-08-26", description: "網路購物", amount: -2500, balance: 90730, type: "支出" },
    { id: "7", date: "2025-08-25", description: "利息收入", amount: 150, balance: 93230, type: "收入" },
    { id: "8", date: "2025-08-24", description: "餐廳消費", amount: -680, balance: 93080, type: "支出" },
    { id: "9", date: "2025-08-23", description: "加油站", amount: -1500, balance: 93760, type: "支出" },
    { id: "10", date: "2025-08-22", description: "超商購物", amount: -320, balance: 95260, type: "支出" },
  ]

  const twdAccounts = [
    { account: "005-005-000001", balance: 100000 },
    { account: "005-212-000002", balance: 25680 },
  ]

  const foreignAccounts = [
    { currency: "USD", balance: 8500, percentage: 70 },
    { currency: "JPY", balance: 150000, percentage: 20 },
    { currency: "EUR", balance: 800, percentage: 10 },
  ]

  const exchangeRates = [
    { currency: "USD", buy: 31.25, sell: 31.35, change: "+0.15%" },
    { currency: "JPY", buy: 0.208, sell: 0.212, change: "-0.08%" },
    { currency: "CNY", buy: 4.32, sell: 4.38, change: "+0.23%" },
    { currency: "EUR", buy: 33.85, sell: 33.95, change: "-0.12%" },
  ]

  const loanRecords = [
    { date: "2025-08-25", amount: 10000 },
    { date: "2025-07-25", amount: 10000 },
    { date: "2025-06-25", amount: 10000 },
    { date: "2025-05-25", amount: 10000 },
  ]

  const stockHoldings = [
    { name: "台積電", symbol: "2330", change: "+2.5%" },
    { name: "聯發科", symbol: "2454", change: "-1.2%" },
    { name: "鴻海", symbol: "2317", change: "+0.8%" },
    { name: "台達電", symbol: "2308", change: "+1.5%" },
  ]

  const [paymentAccount, setPaymentAccount] = useState("005-005-000001")
  const [paymentAmount, setPaymentAmount] = useState("full")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("immediate")
  const [scheduledDate, setScheduledDate] = useState("")

  const isValidCustomAmount = () => {
    const amount = Number.parseFloat(customAmount)
    return !isNaN(amount) && amount > 0 && amount <= 15000
  }

  const isPaymentValid = () => {
    if (paymentAmount === "custom") {
      return isValidCustomAmount()
    }
    return true
  }

  const getCustomAmountError = () => {
    if (!customAmount) return ""
    const amount = Number.parseFloat(customAmount)
    if (isNaN(amount) || amount <= 0) return "金額必須為正數"
    if (amount > 15000) return "金額不能超過NT$15,000"
    return ""
  }

  const handleSettingsOption = (option: string) => {
    setShowSettingsPanel(false)
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content: `您選擇了${option}，請提供相關資料。`,
      time: "剛剛",
    }
    if (isDemo1Mode) {
      setChatMessages((prev) => [...prev, newMessage])
    } else {
      setMainChatMessages((prev) => [...prev, newMessage])
    }
  }

  const CreditCardPaymentPage = () => (
    <div
      className={`w-full max-w-md mx-auto min-h-screen bg-background p-4 ${fontScale === "large" ? "text-base" : ""}`}
    >
      <Card className="bg-card border-border rounded-lg shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("main")} className="p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-lg">信用卡繳費</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">本期應繳金額</span>
              <span className="font-semibold text-green-600">NT$15,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">帳單期間</span>
              <span className="text-sm">2025/08/01 ~ 2025/08/31</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">繳款截止日</span>
              <span className="text-sm text-red-600">2025/09/15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">本期已繳金額</span>
              <span className="text-sm">NT$0</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">扣款帳號</label>
            <Select value={paymentAccount} onValueChange={setPaymentAccount}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="005-005-000001">005-005-000001</SelectItem>
                <SelectItem value="005-212-000002">005-212-000002</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">繳納金額</label>
            <RadioGroup value={paymentAmount} onValueChange={setPaymentAmount}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <label htmlFor="full" className="text-sm">
                  本期應繳金額：NT$15,000
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minimum" id="minimum" />
                <label htmlFor="minimum" className="text-sm">
                  最低應繳金額：NT$1,500
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <label htmlFor="custom" className="text-sm">
                  輸入繳納金額
                </label>
              </div>
              {paymentAmount === "custom" && (
                <div className="ml-6 mt-2 space-y-1">
                  <Input
                    type="number"
                    placeholder="請輸入金額"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  {getCustomAmountError() && <p className="text-xs text-red-600">{getCustomAmountError()}</p>}
                </div>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">繳納日期</label>
            <div className="flex gap-2">
              <Button
                variant={paymentDate === "immediate" ? "default" : "outline"}
                onClick={() => setPaymentDate("immediate")}
                className="flex-1"
              >
                立即
              </Button>
              <Button
                variant={paymentDate === "scheduled" ? "default" : "outline"}
                onClick={() => setPaymentDate("scheduled")}
                className="flex-1"
              >
                預約
              </Button>
            </div>
            {paymentDate === "scheduled" && (
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <Button
            className="w-full mt-6"
            disabled={!isPaymentValid()}
            onClick={() => {
              const amount = paymentAmount === "full" ? "15,000" : paymentAmount === "minimum" ? "1,500" : customAmount
              const newMessage: ChatMessage = {
                id: Date.now().toString(),
                type: "ai",
                content: `已提交信用卡繳費申請，金額NT$${amount}，預計5分鐘內完成。`,
                time: "剛剛",
              }
              if (isDemo1Mode) {
                setChatMessages((prev) => [...prev, newMessage])
              } else {
                setMainChatMessages((prev) => [...prev, newMessage])
              }
              setCurrentView("main")
            }}
          >
            確認繳費
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  if (showLogin) {
    return (
      <LoginPage
        onLoginSuccess={() => {
          setShowLogin(false)
          setIsDemo1Mode(false)
          setCurrentView("main")
        }}
        onDemo1Login={() => {
          setShowLogin(false)
          setIsDemo1Mode(true)
          setCurrentView("demo1-a3")
        }}
      />
    )
  }

  if (currentView === "demo1-a3") {
    return (
      <Demo1PasswordChangePage
        onComplete={() => setCurrentView("demo1-a4")}
        onBack={() => {
          setShowLogin(true)
          setIsDemo1Mode(false)
          setCurrentView("main")
        }}
      />
    )
  }

  if (currentView === "demo1-a4") {
    return (
      <Demo1MainView
        fontScale={fontScale}
        setFontScale={setFontScale}
        showSettingsPanel={showSettingsPanel}
        setShowSettingsPanel={setShowSettingsPanel}
        onLogout={() => {
          setShowLogin(true)
          setIsDemo1Mode(false)
          setCurrentView("main")
        }}
        accountBalances={accountBalances}
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        isListening={isListening}
        setIsListening={setIsListening}
        handleSendMessage={handleSendMessageFn}
        handleVoiceInput={handleVoiceInputFn}
        handleBalanceInquiry={handleBalanceInquiry}
        handleShortcutClick={handleShortcutClick}
        handleSettingsOption={handleSettingsOption}
        showTransferModal={showTransferModal}
        showPaymentModal={showPaymentModal}
        showTransactionModal={showTransactionModal}
        showOtherFunctionsModal={showOtherFunctionsModal}
        setShowOtherFunctionsModal={setShowOtherFunctionsModal}
        otherFunctionsLevel={otherFunctionsLevel}
        setOtherFunctionsLevel={setOtherFunctionsLevel}
        handleOtherFunctionsOption={handleOtherFunctionsOption}
        showCreditCardDetailsModal={showCreditCardDetailsModal}
        setShowCreditCardDetailsModal={setShowCreditCardDetailsModal}
      />
    )
  }

  if (showTransactionDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md min-h-screen flex flex-col bg-white rounded-xl shadow-lg">
          <header className="bg-card border-b border-border p-4 rounded-t-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowTransactionDetails(false)} className="p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">交易明細</h1>
                <p className="text-sm text-muted-foreground">帳戶：{selectedAccount}</p>
                <p className="text-xs text-muted-foreground">
                  {startDate} 至 {endDate}
                </p>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <Card key={transaction.id} className="bg-card border border-border">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={transaction.type === "收入" ? "default" : "secondary"} className="text-xs">
                            {transaction.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        </div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          餘額：NT$ {transaction.balance.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-sm ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.amount > 0 ? "+" : ""}NT$ {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "credit-card-payment") {
    return <CreditCardPaymentPage />
  }

  if (!isDynamicInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Status Bar */}
        <div className="bg-white px-4 py-2 flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-4">
            <span>11:38</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-3 bg-gray-400 rounded-sm"></div>
            </div>
            <span>4G</span>
            <div className="w-6 h-3 border border-gray-800 rounded-sm relative">
              <div className="w-4 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <QrCode className="w-6 h-6 text-gray-600" />
            <Search className="w-6 h-6 text-gray-600" />
          </div>

          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">土</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm">👨</span>
            </div>
            <Bell className="w-6 h-6 text-gray-600" />
            <Button variant="outline" size="sm" onClick={() => setIsDynamicInterface(true)} className="text-sm">
              一鍵切換
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Account Balance Tabs */}
        <div className="px-4 py-6">
          <div className="flex gap-4 mb-6">
            <Button variant="outline" className="flex-1 h-12 bg-white border-2 border-primary text-primary font-medium">
              臺幣總額(NTD)
            </Button>
            <Button variant="outline" className="flex-1 h-12 bg-gray-50 border-gray-200 text-gray-600">
              外幣總額(約NTD)
            </Button>
          </div>

          {/* Balance Display */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <EyeOff className="w-6 h-6 text-gray-400" />
            <div className="text-3xl font-bold text-primary tracking-wider">* * * * *</div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Banking Functions Grid */}
        <div className="px-4 mb-8">
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">帳戶總覽</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpDown className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">臺幣轉帳</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">外幣買賣</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">繳費繳稅</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Banknote className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">無卡提款</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">臺幣明細</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">土銀Pay</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">熱門申請</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="ghost" size="sm" className="text-primary">
                  編輯
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exchange Rates */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">即期匯率</h2>
            <Button variant="ghost" className="text-primary">
              查看更多
            </Button>
          </div>

          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 mb-3">
                <span>幣別</span>
                <span className="text-center">即期買入</span>
                <span className="text-center">即期賣出</span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🇺🇸</span>
                    </div>
                    <span className="font-medium">美元USD</span>
                  </div>
                  <span className="text-center font-bold">30.389</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">30.489</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🇯🇵</span>
                    </div>
                    <span className="font-medium">日幣JPY</span>
                  </div>
                  <span className="text-center font-bold">0.2046</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">0.2086</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🇨🇳</span>
                    </div>
                    <span className="font-medium">人民幣CNY</span>
                  </div>
                  <span className="text-center font-bold">4.227</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">4.277</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🇪🇺</span>
                    </div>
                    <span className="font-medium">歐元EUR</span>
                  </div>
                  <span className="text-center font-bold">35.46</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">35.82</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <span>更新：2025/08/25 11:37</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 py-2">
            <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-xs text-primary font-medium">首頁</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">信用卡</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
              <DollarSign className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">貸款</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
              <TrendingUp className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">理財</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
              </div>
              <span className="text-xs text-gray-400">更多</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full max-w-md mx-auto min-h-screen bg-background text-foreground flex flex-col ${fontScale === "large" ? "text-base" : ""}`}
    >
      <header className="bg-card border-b border-border p-2 rounded-t-xl flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">福</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">小福德銀行</h1>
              <p className="text-xs text-muted-foreground">輕鬆玩轉App</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDynamicInterface(!isDynamicInterface)}
              className="flex items-center gap-1 text-xs"
            >
              {isDynamicInterface ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
              一鍵切換
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontScale(fontScale === "normal" ? "large" : "normal")}
              className="flex items-center gap-1 text-xs"
            >
              <Type className="w-3 h-3" />
              字型
            </Button>
            <Sheet open={showSettingsPanel} onOpenChange={setShowSettingsPanel}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs bg-transparent">
                  <Settings className="w-3 h-3" />
                  設定
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-sm">
                <SheetHeader>
                  <SheetTitle>設定</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">個人服務</h3>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("地址/電話/電子信箱變更")}
                      >
                        地址/電話/電子信箱變更
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("使用者代號密碼變更")}
                      >
                        使用者代號密碼變更
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("金融卡管理")}
                      >
                        金融卡管理
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">系統設定</h3>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("語言")}
                      >
                        語言
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("手機綁定")}
                      >
                        手機綁定
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("智慧登入")}
                      >
                        智慧登入
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("行動身分驗證FIDO申請")}
                      >
                        行動身分驗證FIDO申請
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => handleSettingsOption("推播OTP申請")}
                      >
                        推播OTP申請
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1 text-xs"
            >
              <LogOut className="w-3 h-3" />
              登出
            </Button>
          </div>
        </div>
      </header>

      {isDynamicInterface ? (
        <div className="flex flex-col h-screen">
          <Card className="bg-card border-border rounded-lg shadow-sm border py-px" style={{ height: "30vh" }}>
            <div className="h-full flex flex-col p-0.5 space-y-0.5">
              {/* 常用功能 - 在上半部 */}
              <div className="flex-1">
                <CardHeader className="pb-0 pt-0.5 px-2">
                  <CardTitle className="text-xs flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-primary" />
                    常用功能
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0.5 px-2">
                  <div className="grid grid-cols-4 gap-1">
                    <Button
                      variant="outline"
                      className="h-8 flex flex-col items-center justify-center gap-0 text-xs hover:bg-primary/10 bg-transparent p-1"
                      onClick={() => handleShortcutClick("transfer")}
                    >
                      <ArrowUpDown className="w-3 h-3 text-primary" />
                      <span className="font-medium text-xs">轉帳</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-8 flex flex-col items-center justify-center gap-0 text-xs hover:bg-primary/10 bg-transparent p-1"
                      onClick={() => handleShortcutClick("transactions")}
                    >
                      <FileText className="w-3 h-3 text-primary" />
                      <span className="font-medium text-xs">交易明細</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-8 flex flex-col items-center justify-center gap-0 text-xs hover:bg-primary/10 bg-transparent p-1"
                      onClick={() => handleShortcutClick("payment")}
                    >
                      <Receipt className="w-3 h-3 text-primary" />
                      <span className="font-medium text-xs">繳費</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-8 flex flex-col items-center justify-center gap-0 text-xs hover:bg-primary/10 bg-transparent border-dashed p-1"
                      onClick={() => handleShortcutClick("other-functions")}
                    >
                      <MoreHorizontal className="w-3 h-3 text-primary" />
                      <span className="font-medium text-xs">其他功能</span>
                    </Button>
                  </div>
                </CardContent>
              </div>

              {/* 帳戶總覽 - 在下半部 */}
              <div className="flex-1">
                <CardHeader className="pb-0 pt-0.5 px-2">
                  <CardTitle className="text-xs flex items-center gap-1">
                    <CreditCard className="w-3 h-3 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-xs">福</span>
                    </CreditCard>
                    帳戶總覽
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="ml-auto p-0"
                    >
                      {showBalance ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0.5 px-2">
                  <div className="grid grid-cols-4 gap-1">
                    {accountBalances.map((account) => (
                      <div key={account.type} className="text-center">
                        <div className="text-xs text-muted-foreground mb-0.5">{account.label}</div>
                        <div className="text-xs font-bold text-primary mb-0.5">
                          {showBalance
                            ? `${account.currency} ${account.amount.toLocaleString()}`
                            : `${account.currency} ****`}
                        </div>
                        {account.change && (
                          <div className="flex justify-center mb-0.5">
                            <Badge variant="secondary" className="text-xs h-2.5 px-1">
                              {account.changeType === "up" ? (
                                <TrendingUp className="w-1.5 h-1.5" />
                              ) : (
                                <TrendingDown className="w-1.5 h-1.5" />
                              )}
                            </Badge>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-3 p-0 text-primary hover:underline"
                          onClick={() => handleBalanceInquiry(account.type)}
                        >
                          查詢
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* AI助理 - 在最下面 */}
          <div className="flex-[2] flex flex-col bg-background">
            <div className="pb-1">
              <div className="text-sm flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-xs">福</span>
                </div>
                小福德 AI 助理
              </div>
            </div>

            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-2 mb-2" style={{ maxHeight: "300px" }}>
                {mainChatMessages.map((message) => (
                  <div key={message.id} className={`${message.type === "user" ? "ml-2" : ""}`}>
                    <div
                      className={`rounded-lg p-2 ${
                        message.type === "user" ? "bg-primary text-primary-foreground ml-auto max-w-xs" : "bg-muted/50"
                      }`}
                    >
                      {message.type === "ai" && (
                        <div className="flex items-start gap-1">
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-foreground font-bold text-xs">福</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs leading-relaxed">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{message.time}</p>
                          </div>
                        </div>
                      )}
                      {message.type === "user" && (
                        <div>
                          <p className="text-xs">{message.content}</p>
                          <p className="text-xs opacity-70 mt-0.5">{message.time}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 space-y-2">
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceInputFn}
                    className={`h-6 flex items-center gap-1 text-xs ${isListening ? "bg-red-100 border-red-300" : ""}`}
                    disabled={isListening}
                  >
                    <Mic className={`w-3 h-3 ${isListening ? "text-red-600" : "text-primary"}`} />
                  </Button>
                  <Input
                    type="text"
                    placeholder="您好！今天有什麼可以為您服務的嗎？"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessageFn()
                      }
                    }}
                    className="flex-1 text-sm"
                  />
                  <Button onClick={handleSendMessageFn} disabled={!chatInput.trim()} size="sm" className="h-6">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {["存摺掛失", "開戶需要什麼文件？", "基金推薦"].map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setChatInput(reply)
                        handleSendMessageFn()
                      }}
                      className="text-xs h-5"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {/* Status Bar */}
          <div className="bg-white px-4 py-2 flex items-center justify-between text-sm font-medium">
            <div className="flex items-center gap-4">
              <span>11:38</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
                <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
                <div className="w-1 h-3 bg-gray-400 rounded-sm"></div>
              </div>
              <span>4G</span>
              <div className="w-6 h-3 border border-gray-800 rounded-sm relative">
                <div className="w-4 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <QrCode className="w-6 h-6 text-gray-600" />
              <Search className="w-6 h-6 text-gray-600" />
            </div>

            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">土</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm">👨</span>
              </div>
              <Bell className="w-6 h-6 text-gray-600" />
              <Button variant="outline" size="sm" onClick={() => setIsDynamicInterface(true)} className="text-sm">
                一鍵切換
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Account Balance Tabs */}
          <div className="px-4 py-6">
            <div className="flex gap-4 mb-6">
              <Button
                variant="outline"
                className="flex-1 h-12 bg-white border-2 border-primary text-primary font-medium"
              >
                臺幣總額(NTD)
              </Button>
              <Button variant="outline" className="flex-1 h-12 bg-gray-50 border-gray-200 text-gray-600">
                外幣總額(約NTD)
              </Button>
            </div>

            {/* Balance Display */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <EyeOff className="w-6 h-6 text-gray-400" />
              <div className="text-3xl font-bold text-primary tracking-wider">* * * * *</div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          {/* Banking Functions Grid */}
          <div className="px-4 mb-8">
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">帳戶總覽</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">臺幣轉帳</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">外幣買賣</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">繳費繳稅</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Banknote className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">無卡提款</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">臺幣明細</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">土銀Pay</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">熱門申請</span>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="text-primary">
                    編輯
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Rates */}
          <div className="px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">即期匯率</h2>
              <Button variant="ghost" className="text-primary">
                查看更多
              </Button>
            </div>

            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 mb-3">
                  <span>幣別</span>
                  <span className="text-center">即期買入</span>
                  <span className="text-center">即期賣出</span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🇺🇸</span>
                      </div>
                      <span className="font-medium">美元USD</span>
                    </div>
                    <span className="text-center font-bold">30.389</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">30.489</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🇯🇵</span>
                      </div>
                      <span className="font-medium">日幣JPY</span>
                    </div>
                    <span className="text-center font-bold">0.2046</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">0.2086</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🇨🇳</span>
                      </div>
                      <span className="font-medium">人民幣CNY</span>
                    </div>
                    <span className="text-center font-bold">4.227</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">4.277</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">🇪🇺</span>
                      </div>
                      <span className="font-medium">歐元EUR</span>
                    </div>
                    <span className="text-center font-bold">35.46</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">35.82</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                  <span>更新：2025/08/25 11:37</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="grid grid-cols-5 py-2">
              <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
                <Home className="w-6 h-6 text-primary" />
                <span className="text-xs text-primary font-medium">首頁</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400">信用卡</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
                <DollarSign className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400">貸款</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
                <TrendingUp className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400">理財</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center gap-1 py-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
                </div>
                <span className="text-xs text-gray-400">更多</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">轉帳選項</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 justify-center bg-transparent"
              onClick={() => handleTransferOption("非約定轉帳")}
            >
              非約定轉帳
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 justify-center bg-transparent"
              onClick={() => handleTransferOption("約定轉帳")}
            >
              約定轉帳
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 justify-center bg-transparent"
              onClick={() => handleTransferOption("常用帳號")}
            >
              常用帳號
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">繳費選項</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("公共事業費")}
            >
              <Building className="w-5 h-5" />
              <span className="text-xs">公共事業費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("公路監理費")}
            >
              <Car className="w-5 h-5" />
              <span className="text-xs">公路監理費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("勞健保費")}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs">勞健保費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("稅規費")}
            >
              <FileBarChart className="w-5 h-5" />
              <span className="text-xs">稅規費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("停車費")}
            >
              <Car className="w-5 h-5" />
              <span className="text-xs">停車費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("Etag儲值")}
            >
              <CreditCardIcon className="w-5 h-5" />
              <span className="text-xs">Etag儲值</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("台北市水費")}
            >
              <Droplets className="w-5 h-5" />
              <span className="text-xs">台北市水費</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("電信費用")}
            >
              <Phone className="w-5 h-5" />
              <span className="text-xs">電信費用</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 bg-transparent"
              onClick={() => handlePaymentOption("其他費用")}
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="text-xs">其他費用</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">交易明細查詢</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="account" className="text-sm font-medium">
                選擇帳戶
              </Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="請選擇帳戶" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="005-005-000001">005-005-000001</SelectItem>
                  <SelectItem value="005-212-000002">005-212-000002</SelectItem>
                  <SelectItem value="005-101-000003">005-101-000003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate" className="text-sm font-medium">
                開始日期
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="endDate" className="text-sm font-medium">
                結束日期
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleTransactionQuery}
              disabled={!selectedAccount || !startDate || !endDate}
              className="w-full"
            >
              查詢交易明細
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBalanceModal} onOpenChange={setShowBalanceModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {balanceQueryType === "twd" && "台幣帳戶查詢"}
              {balanceQueryType === "foreign" && "外幣帳戶查詢"}
              {balanceQueryType === "loan" && "貸款查詢"}
              {balanceQueryType === "securities" && "證券查詢"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {balanceQueryType === "twd" && (
              <div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">005-005-000001</span>
                    <span className="font-bold">NT$ 100,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">005-212-000002</span>
                    <span className="font-bold">NT$ 25,680</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded font-bold">
                    <span>總額</span>
                    <span>NT$ 125,680</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">資金分布</div>
                  <div className="flex justify-center mb-2">
                    <div style={{ width: "200px", height: "200px" }}>
                      <Pie
                        data={{
                          labels: ["005-005-000001", "005-212-000002"],
                          datasets: [
                            {
                              data: [79.6, 20.4],
                              backgroundColor: ["#3B82F6", "#10B981"],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            legend: {
                              position: "bottom",
                              labels: { font: { size: 10 } },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {balanceQueryType === "foreign" && (
              <div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">USD</span>
                    <span className="font-bold">USD 8,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">JPY</span>
                    <span className="font-bold">JPY 150,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">EUR</span>
                    <span className="font-bold">EUR 800</span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground mb-2">資金分布</div>
                  <div className="flex justify-center mb-2">
                    <div style={{ width: "200px", height: "200px" }}>
                      <Pie
                        data={{
                          labels: ["USD", "JPY", "EUR"],
                          datasets: [
                            {
                              data: [70, 20, 10],
                              backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            legend: {
                              position: "bottom",
                              labels: { font: { size: 10 } },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">今日匯率</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>USD/TWD</span>
                      <div className="text-right">
                        <div>買入: 31.25 / 賣出: 31.35</div>
                        <div className="text-xs text-green-600">+0.15%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>JPY/TWD</span>
                      <div className="text-right">
                        <div>買入: 0.208 / 賣出: 0.212</div>
                        <div className="text-xs text-red-600">-0.08%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>CNY/TWD</span>
                      <div className="text-right">
                        <div>買入: 4.32 / 賣出: 4.38</div>
                        <div className="text-xs text-green-600">+0.23%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>EUR/TWD</span>
                      <div className="text-right">
                        <div>買入: 33.85 / 賣出: 33.95</div>
                        <div className="text-xs text-red-600">-0.12%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {balanceQueryType === "loan" && (
              <div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">下期還款金額</span>
                    <span className="font-bold text-red-600">NT$ 10,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">利率</span>
                    <span className="font-bold">3.5%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">近期還款紀錄</div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>2025-08-25</span>
                      <span>NT$ 10,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>2025-07-25</span>
                      <span>NT$ 10,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>2025-06-25</span>
                      <span>NT$ 10,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                      <span>2025-05-25</span>
                      <span>NT$ 10,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {balanceQueryType === "securities" && (
              <div>
                <div className="mb-4 p-2 bg-primary/10 rounded text-center">
                  <div className="text-sm text-muted-foreground">整體績效</div>
                  <div className="font-bold text-green-600 text-lg">+8.5%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">持有股票</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <div className="text-sm font-medium">台積電</div>
                        <div className="text-xs text-muted-foreground">2330</div>
                      </div>
                      <div className="font-bold text-green-600">+2.5%</div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <div className="text-sm font-medium">聯發科</div>
                        <div className="text-xs text-muted-foreground">2454</div>
                      </div>
                      <div className="font-bold text-red-600">-1.2%</div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <div className="text-sm font-medium">鴻海</div>
                        <div className="text-xs text-muted-foreground">2317</div>
                      </div>
                      <div className="font-bold text-green-600">+0.8%</div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <div className="text-sm font-medium">台達電</div>
                        <div className="text-xs text-muted-foreground">2308</div>
                      </div>
                      <div className="font-bold text-green-600">+1.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showOtherFunctionsModal} onOpenChange={setShowOtherFunctionsModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {otherFunctionsLevel !== "main" && (
                <Button variant="ghost" size="sm" onClick={handleOtherFunctionsBack} className="p-1">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <DialogTitle className="text-lg">
                {otherFunctionsLevel === "main" && "其他功能"}
                {otherFunctionsLevel === "twd" && "台幣功能"}
                {otherFunctionsLevel === "tubank-pay" && "土銀Pay"}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-3">
            {otherFunctionsLevel === "main" && (
              <>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("台幣")}
                >
                  台幣
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("外幣")}
                >
                  外幣
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("貸款")}
                >
                  貸款
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("信用卡")}
                >
                  信用卡
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("證券")}
                >
                  證券
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("基金")}
                >
                  基金
                </Button>
              </>
            )}
            {otherFunctionsLevel === "twd" && (
              <>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("台幣轉帳")}
                >
                  台幣轉帳
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("台幣明細")}
                >
                  台幣明細
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("土銀Pay")}
                >
                  土銀Pay
                </Button>
              </>
            )}
            {otherFunctionsLevel === "tubank-pay" && (
              <>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("掃碼")}
                >
                  掃碼
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-center bg-transparent"
                  onClick={() => handleOtherFunctionsOption("被掃碼")}
                >
                  被掃碼
                </Button>
                <div className="flex justify-center mt-4">
                  <div className="w-48 h-48 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-500" />
                      <p className="text-sm text-gray-600">模擬 QR Code</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreditCardDetailsModal} onOpenChange={setShowCreditCardDetailsModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreditCardDetailsModal(false)}
                className="p-1 h-auto"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle className="text-base">信用卡交易明細</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">查詢期間：2025/08/01 ～ 2025/08/31</div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {[
                { date: "2025/08/31", description: "全聯福利中心", amount: -850, balance: 125680 },
                { date: "2025/08/30", description: "餐廳消費", amount: -1200, balance: 126530 },
                { date: "2025/08/29", description: "加油站", amount: -800, balance: 127730 },
                { date: "2025/08/28", description: "網路購物", amount: -2500, balance: 128530 },
                { date: "2025/08/27", description: "超商消費", amount: -150, balance: 131030 },
                { date: "2025/08/26", description: "電影票", amount: -320, balance: 131180 },
                { date: "2025/08/25", description: "咖啡廳", amount: -180, balance: 131500 },
                { date: "2025/08/24", description: "書店", amount: -450, balance: 131680 },
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {transaction.amount < 0 ? "-" : "+"}NT$ {Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">餘額 NT$ {transaction.balance.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
